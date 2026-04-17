const previewUrl = process.argv[2];

if (!previewUrl) {
  throw new Error("Preview URL is required.");
}

const devtoolsVersion = await fetch("http://127.0.0.1:9222/json/version").then(response => response.json());
const createTargetResponse = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(previewUrl)}`, {
  method: "PUT",
});
const target = await createTargetResponse.json();
const socket = new WebSocket(target.webSocketDebuggerUrl || devtoolsVersion.webSocketDebuggerUrl);

let nextId = 1;
const pending = new Map();
const events = [];

const send = (method, params = {}) => {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);

  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);

    if (message.error) {
      reject(new Error(message.error.message));
      return;
    }

    resolve(message.result);
    return;
  }

  if (message.method) {
    events.push(message);
  }
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.bringToFront");

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const selectorResult = await send("Runtime.evaluate", {
      expression: `Boolean(document.querySelector('main section a[href="/#audit"]'))`,
      returnByValue: true,
    });

    if (selectorResult.result.value) {
      break;
    }

    await wait(300);
  }

  const clickResult = await send("Runtime.evaluate", {
    expression: `(() => {
      const targetLink = document.querySelector('main section a[href="/#audit"]');
      if (!targetLink) {
        return { clicked: false, reason: 'CTA link not found' };
      }
      targetLink.click();
      return {
        clicked: true,
        text: targetLink.textContent?.trim() ?? '',
        href: targetLink.getAttribute('href') ?? '',
        currentUrl: window.location.href,
      };
    })()`,
    returnByValue: true,
    awaitPromise: true,
  });

  await wait(1200);

  const finalLocation = await send("Runtime.evaluate", {
    expression: "window.location.href",
    returnByValue: true,
  });

  console.log(
    JSON.stringify({
      clickResult: clickResult.result.value,
      finalUrl: finalLocation.result.value,
    })
  );
} finally {
  socket.close();
}
