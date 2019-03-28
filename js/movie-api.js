"use strict";

/**
 * All functionality for the Movie Database API goes here.
 * See README.md for more details on the API.
 */
const MVDB = {

    /**
     * Search the API for either film or tv.
     * @param {String} query Name of the film/tv to search for 
     * @param {Function} cb Callback in the event of success
     * @param {Function} error Callback in the event of failure
     * @param {String} lang Language used for the search
     * @param {Integer} pages Count of pages to request
     * @param {Boolean} adult Include adult data in request 
     */
    multiSearch: function(query, cb, error, lang = "en-US", pages = 1, adult = false) {
        let req = new XMLHttpRequest();
        let url = `https://api.themoviedb.org/3/search/multi?
            api_key=${KEY.tmdb}&language=${lang}
            &query=${query}&page=${pages}&include_adult=${adult}`;
        req.open("GET", url, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                cb(req.responseText);
            } else {
                error(req.responseText);
            }
        }
        req.send();
    }

}