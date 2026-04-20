(function () {
  'use strict';

  var ENDPOINT = window.__VISITOR_TRACKING_ENDPOINT__ || 'https://your-tracker-domain.example.com/track';
  var STORAGE_KEY = 'bt_anon_id';
  var SESSION_KEY = 'bt_session_id';
  var QUEUE_TIMEOUT_MS = 2500;

  function randomId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return prefix + '_' + window.crypto.randomUUID();
    }

    return (
      prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10)
    );
  }

  function getOrCreateLocalId() {
    try {
      var existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) return existing;
      var created = randomId('anon');
      window.localStorage.setItem(STORAGE_KEY, created);
      return created;
    } catch (error) {
      return randomId('anon');
    }
  }

  function getOrCreateSessionId() {
    try {
      var existing = window.sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      var created = randomId('sess');
      window.sessionStorage.setItem(SESSION_KEY, created);
      return created;
    } catch (error) {
      return randomId('sess');
    }
  }

  function getReferrer() {
    try {
      return document.referrer || '';
    } catch (error) {
      return '';
    }
  }

  function buildPayload() {
    return {
      visit_id: randomId('visit'),
      anonymous_id: getOrCreateLocalId(),
      session_id: getOrCreateSessionId(),
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title || '',
      referrer: getReferrer(),
      user_agent: navigator.userAgent || '',
      language: navigator.language || '',
      screen: {
        width: window.screen && window.screen.width ? window.screen.width : null,
        height: window.screen && window.screen.height ? window.screen.height : null,
      },
      viewport: {
        width: window.innerWidth || null,
        height: window.innerHeight || null,
      },
      timezone: (window.Intl && Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
    };
  }

  function send(payload) {
    var body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      try {
        var blob = new Blob([body], { type: 'application/json' });
        if (navigator.sendBeacon(ENDPOINT, blob)) {
          return;
        }
      } catch (error) {
        // fall through to fetch
      }
    }

    if (window.fetch) {
      window
        .fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
          keepalive: true,
          credentials: 'omit',
          mode: 'cors',
        })
        .catch(function () {
          // intentionally silent
        });
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = QUEUE_TIMEOUT_MS;
    try {
      xhr.send(body);
    } catch (error) {
      // intentionally silent
    }
  }

  function init() {
    try {
      send(buildPayload());
    } catch (error) {
      // intentionally silent
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    setTimeout(init, 0);
  }
})();
