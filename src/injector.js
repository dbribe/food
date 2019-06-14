const pageScript = document.createElement('script');
pageScript.src = chrome.extension.getURL('page.js');

const pageStyle = document.createElement("link");
pageStyle.rel = "stylesheet";
pageStyle.href = chrome.extension.getURL('page.css');

const documentHead = (document.head || document.documentElement);
documentHead.appendChild(pageScript);
documentHead.appendChild(pageStyle);

window.addEventListener("food", event => {
    chrome.runtime.sendMessage(event);
});

chrome.runtime.onMessage.addListener(message => {
    window.dispatchEvent(new CustomEvent("foodMessage", {detail: message}));
});

chrome.runtime.sendMessage({type: "tabIdentification"});