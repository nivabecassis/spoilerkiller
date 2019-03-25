# Spoiler Blocker

## Introduction

Chrome extension blocks any related content found in the webpage to movies and shows you add to the blacklist.

Extension works for TV shows and movies.

## Features

- User inputs show name 
- User can view blacklist
- User can remove shows from the blacklist
- Options page 
  - Still not sure what to add here
- Potentially use an API for finding related content keywords
- Manual addition to the blacklist
  - Context menu on highlighting text to save that keyword to the blacklist 
  - Input field in the extension popup


## Technical Notes

### Chrome Storage API

- Use the storage API for saving the changes the user makes


### Using movie/show db API

1. User inputs name of film/show
2. Sanitize data
3. Call API to get keywords (maybe list of 10-15 items **?**)
4. Save the film/show and associated keywords (or call API everytime the extension is loaded **?**) (Find most efficient solution)
5. On reload of the page, find all words in the page that match the associated keywords (loop through the page details (Will this be an expensive operation? Maybe use anything in `<h>` or `p` elements that contain that content **?**))
6. Block the content using a modest and clean solution (maybe use a blur effect **?**)

- Use a content script in order to interact with the actual content of the website


## To-Do List

[ ] Create popup.html for main extension landing page  
[ ] Create options.html for any options  
[ ] Create the styling for the extension  
[ ] Use API to store the inputted film/show data  
[ ] Find API for film/show data (maybe use an icon for added look **?**)  
[ ] Design actual block html overlay   
[ ] Get appropriate size for the default-icon  
[ ] Allow the user to expand/collapse the list of items in the blacklist 
[ ] Perform validation on the input of the show/movie  
    [ ] Sanitize data  
    [ ] Skip duplicates


## Legal Stuff

### The Movie Database

The below is from their [terms of use](https://www.themoviedb.org/documentation/api/terms-of-use) document, see below.

```
3. Attribution
You shall use the TMDb logo to identify your use of the TMDb APIs.

You shall place the following notice prominently on your application: "This product uses the TMDb API but is not endorsed or certified by TMDb."

Any use of the TMDb logo in your application shall be less prominent than the logo or mark that primarily describes the application and your use of the TMDb logo shall not imply any endorsement by TMDb.
```

