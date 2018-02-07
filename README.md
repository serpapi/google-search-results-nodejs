# google-search-results-nodejs


This NodeJS module is designed to scrape and parse Google results using [SERP API](https://serpapi.com). Feel free to fork this repository to add more backends.

## Installation

Assuming Ruby is already installed:

TODO: Need to publish this API 
```bash
$ npm install google-search-results-nodejs
```

## Simple Example

```javascript
var gsr = require('GoogleSearchResults')
let serp = new gsr.GoogleSearchResults("Your Private Key")
serp.json({
 q: "Coffee", 
 location: "Portland"
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
 location: "Portland",
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

// Show results as JSON with Images
serp.jsonWithImages(query_params, callback)

// Show result as HTML file
serp.html(query_params, callback)
```

See the test located under test/ for more integration details.

