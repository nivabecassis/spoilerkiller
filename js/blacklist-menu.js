"use strict";

function $(id) {
    return (id) ? document.getElementById(id) : null;
}

function addItemtToBlacklist(evt) {
    let itemTxt = $('content-name-field').value;
    let itemList = $('blacklist-items-list');
    console.log(itemTxt, itemList);
    if (itemTxt) {
        let item = cloneBlacklistTemplate(itemTxt);
        itemList.appendChild(item);
        // Add to chrome storage API
        chrome.storage.sync.get('blacklist', function(spk) {
            spk.blacklist.push(itemTxt);
            chrome.storage.sync.set({'blacklist': spk.blacklist});
        });
    }
}

function cloneBlacklistTemplate(itemTxt) {
    let item = $('content-name-template').cloneNode();
    item.id = "";
    item.textContent = itemTxt;
    return item;
}

function loadBlacklist() {
    chrome.storage.sync.get('blacklist', function(spk) {
        if (spk.blacklist && spk.blacklist.length > 0) {
            spk.blacklist.forEach(element => {
                let item = cloneBlacklistTemplate(element);
                let list = $('blacklist-items-list');
                list.appendChild(item);
            });
        } else {
            spk.blacklist = [];
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("onInstalled listener reached");
    $("btnAdd").addEventListener('click', addItemtToBlacklist);
    loadBlacklist();
});

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'blacklist': []});
})