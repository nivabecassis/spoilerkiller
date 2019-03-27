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
    $("blacklist-items-list").addEventListener('click', handleBlacklistClick);
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
        chrome.storage.sync.get('blacklist', function(spk) {
            if (!BL.findMatchInBlacklist(spk.blacklist, itemTxt)) {
                // Add the new item to the Chrome storage API
                let entry = BL.createNewEntry(itemTxt);
                spk.blacklist.push(entry);
                chrome.storage.sync.set({'blacklist': spk.blacklist});
                // Add the new item to the popup.html
                let item = cloneBlacklistTemplate(itemTxt);
                itemList.appendChild(item);
            }
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
                let item = cloneBlacklistTemplate(element.name);
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
    let item = $('blacklist-item-template').cloneNode(true);
    item.removeAttribute('id');
    item.querySelector('.content-name').textContent = itemTxt;
    return item;
}

/**
 * Any click event handling takes place here. Check for the target
 * of the click and handle appropriately.
 * @param {Object} evt MouseEvent on the blacklist items list 
 */
function handleBlacklistClick(evt) {
    if (evt) {
        let target = evt.target;
        if (target.classList.contains('content-remove-btn')) {
            // Remove the entry from the storage API and DOM
            chrome.storage.sync.get('blacklist', function(spk){
                let liTxt = target.previousElementSibling.textContent;
                let blacklistIndex = spk.blacklist.map(e => {e.name}).indexOf(liTxt);
                spk.blacklist.splice(blacklistIndex);
                chrome.storage.sync.set({'blacklist': spk.blacklist});
                target.parentElement.remove();
            });            
        }
    }
}