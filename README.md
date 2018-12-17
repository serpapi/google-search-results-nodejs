# Google Search Results Node.js

[![Build Status](https://travis-ci.org/serpapi/google-search-results-nodejs.svg?branch=master)](https://travis-ci.org/serpapi/google-search-results-nodejs)

This NodeJS module is designed to scrape and parse Google results using [SERP API](https://serpapi.com). Feel free to fork this repository to add more backends.

[The full documentation is available here.](https://serpapi.com/search-api)

## Requirement

- ES6 basic understanding
- NodeJS coding skills
- Node 7+ and NPM installed

## Installation

```bash
$ npm install google-search-results-nodejs
```

## Simple Example

```javascript
var gsr = require('GoogleSearchResults')
let serp = new gsr.GoogleSearchResults("Your Private Key")
serp.json({
 q: "Coffee", 
 location: "Austin, TX"
}, (result) => {
  console.log(result)
})
 ```

## Set SERP API key

```javascript
var gsr = require('GoogleSearchResults')
let serp = new gsr.GoogleSearchResults("Your Private Key")
```
Or
```javascript
var gsr = require('GoogleSearchResults')
let serp = new gsr.GoogleSearchResults()
let result = serp.json({
 q: "Coffee", 
 location: "Austin, TX",
}, (data) => {
  console.log(data)
}, "Your Private Key")
```
## Example with all params and all outputs
```javascript
var gsr = require('GoogleSearchResults')
let serp = new gsr.GoogleSearchResults()
query_params = {
  q: "query",
  google_domain: "Google Domain", 
  location: "Location Requested", 
  device: device,
  hl: "Google UI Language",
  gl: "Google Country",
  safe: "Safe Search Flag",
  num: "Number of Results",
  start: "Pagination Offset",
  serp_api_key: "Your SERP API Key"
}

callback = function(data) {
 console.log(data)
}

// Show result as JSON
serp.json(query_params, callback)

// Show result as HTML file
serp.html(query_params, callback)
```

This service supports Google Images, News, Shopping.
To enable a type of search, the field tbm (to be matched) must be set to:

 * isch: Google Images API.
 * nws: Google News API.
 * shop: Google Shopping API.
 * any other Google service should work out of the box.
 * (no tbm parameter): regular Google Search.

[The full documentation is available here.](https://serpapi.com/search-api)

For pratical example, you can see the test located under test/.
