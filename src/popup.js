
const port = chrome.extension.connect({name: "popup"});

let config = {
    shortcut: "",
    clearConsole: true,
};

const saveConfig = () => {
    chrome.storage.sync.set({"StemJS": config});
    port.postMessage({type: "setStorageValue", key: "StemJSshortcut", value: config.shortcut});
    port.postMessage({type: "setStorageValue", key: "StemJSclearConsole", value: config.clearConsole});
};

const getConfig = (callback) => {
    chrome.storage.sync.get("StemJS", (result) => {
        if (result.StemJS) {
            config = result.StemJS;
        }
        saveConfig();
        callback();
    });
};



const order = () => {
    chrome.runtime.sendMessage({type: "order", value: document.getElementById("orderInput").value});
};
document.getElementById("order").addEventListener("click", order);

const fillOrder = () => {
    chrome.runtime.sendMessage({type: "fillOrder"});
};
document.getElementById("fillOrder").addEventListener("click", fillOrder);