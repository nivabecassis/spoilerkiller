"use strict";

/**
 * Creates the first instance of the blacklist. It is stored
 * in Chrome's storage sync API.
 * 
 * See README.md for data structure of the blacklist
 */
chrome.runtime.onInstalled.addListener(function() {
    let blacklist = [];
    chrome.storage.sync.set({'blacklist': blacklist}, function() {
        console.log('You have just created the blacklist!');
    });
});