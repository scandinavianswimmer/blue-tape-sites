# Visitor Tracking Integration

This package contains a lightweight client tracker and a single-file Node.js receiver.

| File | Purpose |
|---|---|
| `visitor-tracker.js` | Runs silently on page load and sends visit metadata asynchronously. |
| `tracker-server.js` | Receives visit payloads, enriches them with IP and approximate geo data, and appends them to a persistent JSONL log file. |

## 1. Backend deployment

Create a small folder on your server, place `tracker-server.js` inside it, and install Express.

```bash
npm init -y
npm install express
node tracker-server.js
```

By default, the receiver listens on port `8080` and writes logs to `./logs/visitor-events.jsonl`.

You can override settings with environment variables.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | HTTP port for the tracking receiver |
| `TRACKER_LOG_DIR` | `./logs` | Directory for persistent logs |
| `TRACKER_LOG_FILE` | `./logs/visitor-events.jsonl` | Full path to the log file |
| `TRACKER_ALLOW_ORIGIN` | `*` | CORS allow-origin value |
| `ENABLE_GEO_LOOKUP` | `true` | Enables IP-based geolocation lookup |
| `GEO_LOOKUP_TIMEOUT_MS` | `2500` | Timeout for the geo lookup request |
| `TRUST_PROXY` | `true` | Uses forwarded IP headers when behind a proxy |

## 2. Frontend deployment

Upload `visitor-tracker.js` somewhere your site can serve it, such as:

```text
https://your-site.example.com/assets/visitor-tracker.js
```

Then add this snippet inside the `<head>` of every page.

```html
<script>
  window.__VISITOR_TRACKING_ENDPOINT__ = 'https://your-tracker-domain.example.com/track';
</script>
<script async src="https://your-site.example.com/assets/visitor-tracker.js"></script>
```

The tracker fires automatically on page load. It does not render UI, block navigation, or depend on any external frontend library.

## 3. What gets logged

Each request is stored as one JSON object per line in `visitor-events.jsonl`.

```json
{
  "received_at": "2026-04-19T18:10:53.822Z",
  "timestamp": "2026-04-19T18:10:53.701Z",
  "ip_address": "203.0.113.42",
  "location": {
    "country": "United States",
    "city": "Los Angeles"
  },
  "referrer": "https://www.google.com/",
  "page_url": "https://your-site.example.com/pricing",
  "page_path": "/pricing",
  "page_title": "Pricing",
  "user_agent": "Mozilla/5.0 ...",
  "language": "en-US",
  "timezone": "America/Los_Angeles",
  "screen": {
    "width": 1440,
    "height": 900
  },
  "viewport": {
    "width": 1280,
    "height": 781
  },
  "ids": {
    "visit_id": "visit_0d0fe74f-a1fd-4402-a196-4d76095c79f0",
    "anonymous_id": "anon_353fd14e-24fe-4933-9b31-0c59acb6827a",
    "session_id": "sess_2d5bca8c-e83a-4a62-8f3c-64e11177198f"
  },
  "raw_client_payload": {
    "visit_id": "visit_0d0fe74f-a1fd-4402-a196-4d76095c79f0",
    "anonymous_id": "anon_353fd14e-24fe-4933-9b31-0c59acb6827a",
    "session_id": "sess_2d5bca8c-e83a-4a62-8f3c-64e11177198f",
    "timestamp": "2026-04-19T18:10:53.701Z",
    "page_url": "https://your-site.example.com/pricing",
    "page_path": "/pricing",
    "page_title": "Pricing",
    "referrer": "https://www.google.com/",
    "user_agent": "Mozilla/5.0 ...",
    "language": "en-US",
    "screen": { "width": 1440, "height": 900 },
    "viewport": { "width": 1280, "height": 781 },
    "timezone": "America/Los_Angeles"
  }
}
```

## 4. Notes for later database migration

The backend uses append-only JSONL logging so it works immediately without a database. If you later want PostgreSQL, MySQL, or another data store, replace the `appendLog(record)` call in `tracker-server.js` with your database insert logic. The request contract can stay the same.

## 5. Privacy posture

The tracker does not inject UI, does not fingerprint beyond ordinary technical request data, and uses generated anonymous IDs instead of names or emails. The raw IP address is still logged because you explicitly requested it, while the browser-side identifier stays anonymous.
