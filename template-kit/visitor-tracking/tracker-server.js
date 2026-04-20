const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const LOG_DIR = process.env.TRACKER_LOG_DIR || path.join(__dirname, 'logs');
const LOG_FILE = process.env.TRACKER_LOG_FILE || path.join(LOG_DIR, 'visitor-events.jsonl');
const GEO_LOOKUP_ENABLED = process.env.ENABLE_GEO_LOOKUP !== 'false';
const GEO_LOOKUP_TIMEOUT_MS = Number(process.env.GEO_LOOKUP_TIMEOUT_MS || 2500);
const TRUST_PROXY = process.env.TRUST_PROXY !== 'false';
const ALLOW_ORIGIN = process.env.TRACKER_ALLOW_ORIGIN || '*';

if (TRUST_PROXY) {
  app.set('trust proxy', true);
}

fs.mkdirSync(LOG_DIR, { recursive: true });

app.use(express.json({ limit: '32kb' }));
app.use(function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
});

function appendLog(record) {
  fs.appendFileSync(LOG_FILE, JSON.stringify(record) + '\n', 'utf8');
}

function getIpAddress(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  return req.ip || req.socket.remoteAddress || '';
}

function normalizeIp(ip) {
  if (!ip) return '';
  if (ip.startsWith('::ffff:')) {
    return ip.slice(7);
  }
  return ip;
}

function buildAnonymousFingerprint(body) {
  return {
    visit_id: typeof body.visit_id === 'string' ? body.visit_id : '',
    anonymous_id: typeof body.anonymous_id === 'string' ? body.anonymous_id : '',
    session_id: typeof body.session_id === 'string' ? body.session_id : '',
  };
}

async function lookupGeo(ipAddress) {
  if (!GEO_LOOKUP_ENABLED || !ipAddress) {
    return { country: null, city: null, raw: null };
  }

  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, GEO_LOOKUP_TIMEOUT_MS);

  try {
    const response = await fetch('https://ipwho.is/' + encodeURIComponent(ipAddress), {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return { country: null, city: null, raw: null };
    }

    const json = await response.json();

    if (json && json.success === false) {
      return { country: null, city: null, raw: json };
    }

    return {
      country: json.country || null,
      city: json.city || null,
      raw: json || null,
    };
  } catch (error) {
    return { country: null, city: null, raw: null };
  } finally {
    clearTimeout(timeout);
  }
}

app.post('/track', async function trackHandler(req, res) {
  const body = req.body || {};
  const ipAddress = normalizeIp(getIpAddress(req));
  const geo = await lookupGeo(ipAddress);

  const record = {
    received_at: new Date().toISOString(),
    timestamp: typeof body.timestamp === 'string' ? body.timestamp : new Date().toISOString(),
    ip_address: ipAddress,
    location: {
      country: geo.country,
      city: geo.city,
    },
    referrer: typeof body.referrer === 'string' ? body.referrer : '',
    page_url: typeof body.page_url === 'string' ? body.page_url : '',
    page_path: typeof body.page_path === 'string' ? body.page_path : '',
    page_title: typeof body.page_title === 'string' ? body.page_title : '',
    user_agent: typeof body.user_agent === 'string' ? body.user_agent : req.headers['user-agent'] || '',
    language: typeof body.language === 'string' ? body.language : '',
    timezone: typeof body.timezone === 'string' ? body.timezone : '',
    screen: typeof body.screen === 'object' && body.screen ? body.screen : null,
    viewport: typeof body.viewport === 'object' && body.viewport ? body.viewport : null,
    ids: buildAnonymousFingerprint(body),
    raw_client_payload: body,
  };

  appendLog(record);

  res.status(200).json({
    ok: true,
    pipelineForwarded: true,
  });
});

app.get('/health', function healthHandler(req, res) {
  res.status(200).json({ ok: true });
});

app.listen(PORT, function () {
  console.log('Visitor tracker listening on http://localhost:' + PORT);
  console.log('Writing logs to ' + LOG_FILE);
});
