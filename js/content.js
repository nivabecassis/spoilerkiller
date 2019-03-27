"use strict";

/**
 * Onces the page has been loaded, we run the blocking process. 
 */
console.log("the document state is " + document.readyState);
runBlocker();

/**
 * Top level method that will perform the following actions.
 * 
 * 1. Load blacklisted entries/keywords
 * 2. Search the DOM of the current tab for any matching words
 * 3. Apply the blur overlay effect to each of the matching blocks
 */
function runBlocker() {
    chrome.storage.sync.get('blacklist', function(spk) {
        let matches = findMatchingBlocks(spk.blacklist);
    });
}

/**
 * Finds all the blocks of data in the DOM that match content
 * defined in the blacklist.
 * @param {Object} blacklist 
 */
function findMatchingBlocks(blacklist) {
    let textNodes = getAllTextNodes(document.body);
    textNodes.forEach((node) => {
        // Iterate over all elements found in the page
        if (node.textContent) {
            if (checkBlacklistMatch(blacklist, node.textContent)) {
                // Applying the block/blur over the original parent element
                applyBlurOverlay(node.parentNode);
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
    for (let i = 0; i < blacklist.length; i++) {
        // Iterates over each entry in the blacklist 
        // if (text.search(blacklist[i].filter)) {
            // Eventually switch this to use the created filter (regex)
        const lowerText = text.toLowerCase();
        if (lowerText.includes(blacklist[i].name.toLowerCase())) {
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
 * Create a div and place the element inside. Place div where the
 * element. 
 * @param {Object} element that will receive the blur effect
 */
function applyBlurOverlay(element) {
    console.log("Applying blur to the following element ", element);
    let overlay = document.createElement("div");
    overlay.classList.add("blur");
    element.parentElement.replaceChild(overlay, element);
    overlay.appendChild(element);
}

/**
 * Gets all the text nodes below the given root element.
 * @param {Object} root Element root of a node tree.
 */
function getAllTextNodes(root) {
    let temp, nodes = [];
    let walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    // Place all matches in an array
    while (temp = walk.nextNode()) {
        nodes.push(temp);
    }
    return nodes;
}