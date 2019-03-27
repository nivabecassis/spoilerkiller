"use strict";

/**
 * Object contains basic utilities for the SpoilerKiller
 * application related to the blacklist.
 * 
 * Use structure of the blacklist in README.md as a model 
 * reference.
 */
const BL = {

    /**
     * Determines whether a given name (movie/show) is in 
     * the given blacklist.
     * @param {Array} blacklist The blacklist to search in
     * @param {String} name Name of the name to search for
     */
    findMatchInBlacklist(blacklist, name) {
        return blacklist.some(e => e.name === name);
    },

    /**
     * Creates a new object that can be placed in a blacklist.
     * @param {String} name Name of the new show to be added
     */
    createNewEntry(name) {
        return {
            "name": name,
            /*TODO: Once the MVDB functionality is determined,
                    add the keywords request and form a filter
                    to complete the object that is being returned.
                     */
        }
    }

}