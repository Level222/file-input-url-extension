import { fetchDataUrl } from "./fetch-data-url";

const MENU_ID = "use-url-for-file-input";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Use URL for file input",
    id: MENU_ID,
    documentUrlPatterns: ["*://*/*"]
  });
});

chrome.contextMenus.onClicked.addListener(({ menuItemId }, tab) => {
  if (menuItemId === MENU_ID) {
    chrome.tabs.sendMessage(tab.id, { type: "on-context-menu-click" });
  }
});

chrome.runtime.onMessage.addListener(({ type, data }, _sender, sendResponse) => {
  if (type !== "fetch") {
    return;
  }

  fetchDataUrl(data)
    .then((dataUrl) => {
      sendResponse({ ok: true, dataUrl });
    })
    .catch((error) => {
      sendResponse({ ok: false, error });
    });

  return true;
});
