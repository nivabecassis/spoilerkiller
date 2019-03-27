"use strict";

/**
 * Onces the page has been loaded, we run the blocking process. 
 */
document.addEventListener("DOMContentLoaded", runBlocker);

const BLOCKER = {
    textFilters: "p",
    imgFilters: "img"
}

/**
 * Top level method that will perform the following actions.
 * 
 * 1. Load blacklisted entries/keywords
 * 2. Search the DOM of the current tab for any matching words
 * 3. Apply the blur overlay effect to each of the matching blocks
 */
function runBlocker() {
    chrome.storage.sync.get('blacklist', function(spk) {
        // spk.blacklist;
        let matches = findMatchingBlocks(spk.blacklist);
    });
}

/**
 * Finds all the blocks of data in the DOM that match content
 * defined in the blacklist.
 * @param {Object} blacklist 
 */
function findMatchingBlocks(blacklist) {
    textMatches = document.querySelectorAll(BLOCKER.textFilters);
    textMatches.forEach((element) => {
        // Iterate over all elements found in the page
        if (element.textContent) {
            // **See To-Do** ATM only assuming a single string for matching
            if (checkBlacklistMatch(blacklist, element.textContent)) {
                // Applying the block/blur over the original parent element
                applyBlurOverlay(element);
            }
        }
    });
}

/**
 * Checks the given text against each item in the blacklist
 * @param {Object} blacklist Object containing blacklisted entries
 * @param {String} text that may contain blacklisted items
 * @return True if a match is found in the text, false otherwise
 */
function checkBlacklistMatch(blacklist, text) {
    // Below might be wrong
    let bl = blacklist.blacklist;
    for (let i = 0; i < bl.length; i++) {
        // Iterates over each entry in the blacklist 
        if (text.search(bl.filters)) {
            // Match found
            return true;
        }
    }
    // No match found
    return false;
}

/**
 * Applies the blurring effect over the element that is passed
 * as a parameter. 
 * @param {Object} element that will receive the blur effect
 */
function applyBlurOverlay(element) {
    // TODO
}