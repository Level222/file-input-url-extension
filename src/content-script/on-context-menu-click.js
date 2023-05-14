const handlers = new Set();

let contextMenuTarget = null;

document.addEventListener("contextmenu", (e) => {
  contextMenuTarget = e.target;
});

chrome.runtime.onMessage.addListener(({ type }) => {
  if (type !== "on-context-menu-click" || !contextMenuTarget) {
    return;
  }

  for (const handler of handlers) {
    handler(contextMenuTarget);
  }
});

export const onContextMenuClick = (callback) => {
  handlers.add(callback);
};
