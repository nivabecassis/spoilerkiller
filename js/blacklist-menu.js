"use strict";

/**
 * Shorthand for docuement.getElementById(id)
 * @param {String} id 
 */
function $(id) {
    return (id) ? document.getElementById(id) : null;
}

/**
 * Add a click event handler for the button to add the input
 * to the blacklist for storage.
 */
document.addEventListener("DOMContentLoaded", function() {
    $("btnAdd").addEventListener('click', addItemtToBlacklist);
    loadBlacklist();
});

/**
 * Add the inputted item to the blacklist and save it to Chrome
 * storage API
 * @param {Object} evt 
 */
function addItemtToBlacklist(evt) {
    let itemTxt = $('content-name-field').value;
    let itemList = $('blacklist-items-list');
    console.log(itemTxt, itemList);
    if (itemTxt) {
        // Add the item to the popup.html
        let item = cloneBlacklistTemplate(itemTxt);
        itemList.appendChild(item);
        // Add the new item to the Chrome storage API
        chrome.storage.sync.get('blacklist', function(spk) {
            spk.blacklist.push(itemTxt);
            chrome.storage.sync.set({'blacklist': spk.blacklist});
        });
    }
}

/**
 * Loads the blacklist from Chrome storage API and inserts
 * places the shows/movies into the popup.html DOM. 
 */
function loadBlacklist() {
    console.log("Loading the blacklist!");
    chrome.storage.sync.get('blacklist', function(spk) {
        if (spk.blacklist && spk.blacklist.length > 0) {
            spk.blacklist.forEach(element => {
                // Duplicate the template and add it to the DOM
                let item = cloneBlacklistTemplate(element);
                let list = $('blacklist-items-list');
                list.appendChild(item);
            });
        }
    });
}

/**
 * Clones the blacklist template and returns the new element.
 * @param {String} itemTxt The text to be added to the item
 */
function cloneBlacklistTemplate(itemTxt) {
    let item = $('content-name-template').cloneNode();
    item.id = "";
    item.textContent = itemTxt;
    return item;
}