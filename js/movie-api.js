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
        let url = `https://api.themoviedb.org/3/search/multi?
            api_key=${KEY.tmdb}&language=${lang}
            &query=${query}&page=${pages}&include_adult=${adult}`;
        ajaxRequest("GET", url, cb, error);
    },

    /**
     * Searches for keywords of a given movie/tv show.
     * The ID used in this function is the one that is returned
     * from TMDB API. See README.md for more information on it.
     * @param {Integer} id ID of the film/show
     * @param {Integer} type Type of entry {1: movie, 2: tv show}
     * @param {Function} cb Callback in the event of success
     * @param {Function} error Callback in the event of failure
     */
    keywordSearch: function(id, type, cb, error) {
        // vType represents verbose type
        let vType = type === 1 ? 'movie' : 'tv';
        let url = `https://api.themoviedb.org/3/
                    ${vType}/${id}/keywords?api_key=${KEY.tmdb}`;
        ajaxRequest("GET", url, cb, error);
    },

    /**
     * Creates and sends an Ajax request based on the given parameters
     * @param {String} method {GET or POST} 
     * @param {String} url URL of the server to send the request to
     * @param {Function} cb Callback in the event of success
     * @param {Function} error Callback in the event of error
     * @param {String} data POST body of the message (optional). The 
     *                   format of the data param must be in
     *                   application/x-www-form-urlencoded.
     */
    ajaxRequest: function(method, url, cb, error, data = "") {
        let req = new XMLHttpRequest();
        req.open(method, url, true);
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                // Once the ready state represents DONE
                if (req.status === 200) {
                    cb(req.responseText);
                } else {
                    error(req.responseText);
                }
            }
        }
        // Send body of the message if present
        if (data) {
            req.send(data);
        } else {
            req.send();
        }
    }

}