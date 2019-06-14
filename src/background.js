
let tabId;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "tabIdentification") {
        tabId = sender.tab.id;
    }

    chrome.tabs.sendMessage(tabId, message);
});