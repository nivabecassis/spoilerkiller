# Spoiler Blocker

## Introduction

Chrome extension blocks any related content found in the webpage to movies and shows you add to the blacklist.

Extension works for TV shows and movies.

## Features

- User inputs show name 
- User can view blacklist
- User can remove shows from the blacklist
- Options page 
  - Quick enable/disable (maybe in real time)
- Potentially use an API for finding related content keywords
- Manual addition to the blacklist
  - Context menu on highlighting text to save that keyword to the blacklist 
  - Input field in the extension popup 


## Technical Notes

### Blacklist

#### JSON Object format

{
    "blacklist": [
        {
            "name": "Game of Thrones",
            "filters": "game of thrones|stark|lannister",
            "keywords": [
                "game of thrones",
                "stark",
                "lannister"
            ]
        }
    ]
}

### Chrome Storage API

- Use the storage API for saving the changes the user makes
- New movie/show is added to the API when the user clicks the 'submit' button
- Blacklist is reloaded from storage API everytime the popup.html is opened


### App functionality in Details

#### Extension Side

1. User inputs name of film/show
2. Sanitize data
3. Call API to get keywords (maybe list of 10-15 items **?**)
4. Save the film/show and associated keywords (or call API everytime the extension is loaded **?**) (Find most efficient solution)

#### Active Tab Side (Content Script)

1. On load of the page, load the list of blacklisted entries/keywords.
2. Find all words in the page that match the associated keywords (loop through the page details (Will this be an expensive operation? Maybe use anything in `<h>` or `p` elements that contain that content **?**))
3. Apply content block using the blur overlay effect

## To-Do List

### Main Features

[x] Create popup.html for main extension landing page  
[x] Allow user to add entries to the blacklist  
[x] Allow user to remove entries from the blacklist
[x] Standardize the creation/use of the blacklist object    
[ ] Find API for film/show data  
[ ] Use API to get film/show data  
    [ ] Ensure to place a request rate limiting feature 
    [ ] Upon entering a new entry into the blacklist, also store a single string that can be used as a regex pattern matcher to increase performance  
[x] Design actual block html overlay (the screen that hides blacklisted content)  
[x] Apply screen over blacklisted content in a content script  
[ ] Use MutationObserver to listen to new changes to the DOM  
[ ] Perform validation on the input of the show/movie  
    [ ] Sanitize data  
    [x] Skip duplicates  

### Styling/Optional

[ ] Create options.html for any options  
[ ] Create the styling for the extension  
[ ] Get appropriate size for the default-icon  
[ ] Allow the user to expand/collapse the list of items in the blacklist  
[ ] Allow the submission of the new entry with the 'Enter' key  


## Legal Stuff

### The Movie Database

The below is from their [terms of use](https://www.themoviedb.org/documentation/api/terms-of-use) document, see below.

```
1. Attribution
You shall use the TMDb logo to identify your use of the TMDb APIs.

You shall place the following notice prominently on your application: "This product uses the TMDb API but is not endorsed or certified by TMDb."

Any use of the TMDb logo in your application shall be less prominent than the logo or mark that primarily describes the application and your use of the TMDb logo shall not imply any endorsement by TMDb.
```


### Author Credits

<div>Icons made by <a href="https://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

