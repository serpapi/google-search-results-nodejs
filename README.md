# Google Search Results Node.js

[![Build Status](https://travis-ci.org/serpapi/google-search-results-nodejs.svg?branch=master)](https://travis-ci.org/serpapi/google-search-results-nodejs)

This NodeJS module is designed to scrape and parse Google, Bing and Baidu results using [SERP API](https://serpapi.com). Feel free to fork this repository to add more backends.

This Ruby Gem is meant to scrape and parse Google results using [SerpApi](https://serpapi.com).
The following services are provided:
 * [Search API](https://serpapi.com/search-api)
 * [Location API](https://serpapi.com/locations-api)
 * [Search Archive API](https://serpapi.com/search-archive-api)
 * [Account API](https://serpapi.com/account-api)

Serp API provides a [script builder](https://serpapi.com/demo) to get you started quickly.

[The full documentation is available here.](https://serpapi.com/search-api)

## Requirement

- ES6 basic understanding
- NodeJS coding skills
- Node 7+ and NPM installed

## Installation

NPM 7+

```bash
$ npm install google-search-results-nodejs
```

[Link to npm package](https://www.npmjs.com/package/google-search-results-nodejs)

## Quick start

```javascript
const GSR = require('google-search-results-nodejs')
const client = new GSR.GoogleSearchResults("Your Private Key")
client.json({
 q: "Coffee", 
 location: "Austin, TX"
}, (result) => {
  console.log(result)
})
 ```
This example runs a search about "coffee" using your secret api key.

The Serp API service (backend)
 - searches on Google using the client: q = "coffee"
 - parses the messy HTML responses
 - return a standardizes JSON response
The class GoogleSearchResults
 - Format the request to Serp API server
 - Execute GET http request
 - Parse JSON into Ruby Hash using JSON standard library provided by Ruby
Et voila..

Alternatively, you can search:
 - Bing using BingSearchResults class
 - Baidu using BaiduSearchResults class

See the [playground to generate your code.](https://serpapi.com/playground)

## Example
 * [How to set SERP API key](#how-to-set-serp-api-key)
 * [Search API capability](#search-api-capability)
 * [Example by specification](#example-by-specification)
 * [Location API](#location-api)
 * [Search Archive API](#search-archive-api)
 * [Account API](#account-api)
 * [Promise and callback](#Promise-and-callback)
 * [Coding style](#coding-style)
 
### How to set SERP API key
The Serp API key can be set globally using a singleton pattern.
```javascript
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults("Your Private Key")
```

The Serp API key can be provided for each request
```javascript
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults()
let result = client.json({
 api_key: "Your private key",
 q: "Coffee",            // search query
 location: "Austin, TX", // location 
}, (data) => {
  console.log(data)
})
```

### Search API capability
```javascript
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
  api_key: "Your SERP API Key",  // https://serpapi.com/dashboard
  tbm: "nws|isch|shop",
  tbs: "custom to be search criteria",
  async: true|false,   // allow async query
  output: "json|html", // output format
}

const GSR = require('google-search-results-nodejs')
const client = new GSR.GoogleSearchResults()

// create a callback
callback = (data) => {
 console.log(data)
}

// Show result as JSON
client.json(query_params, callback)

// Show result as HTML file
client.html(query_params, callback)
```

(the full documentation)[https://serpapi.com/search-api]

see below for more hands on examples.

### Example by specification

We love true open source, continuous integration and Test Drive Development (TDD). 
 We are using RSpec to test [our infrastructure around the clock](https://travis-ci.org/serpapi/google-search-results-ruby) to achieve the best QoS (Quality Of Service).
 
The directory test/ includes specification/examples.

Set your api key.
```bash
export API_KEY="your secret key"
```

Run all tests
```npm test```

### Location API
```javascript
const client = new GSR.GoogleSearchResults(api_key)
client.location("Austin", 3, (data) => {
  console.log(data)
})
```

it prints the first 3 location matching Austin (Texas, Texas, Rochester)
```javascript
[ { id: '585069bdee19ad271e9bc072',
    google_id: 200635,
    google_parent_id: 21176,
    name: 'Austin, TX',
    canonical_name: 'Austin,TX,Texas,United States',
    country_code: 'US',
    target_type: 'DMA Region',
    reach: 5560000,
    gps: [ -97.7430608, 30.267153 ],
    keys: [ 'austin', 'tx', 'texas', 'united', 'states' ] },
  ...]
```

### Search Archive API

The first search result returns a search_id which can be provided to get the search result from the archive.
```javascript
var client = new GSR.GoogleSearchResults(api_key)
client.json({q: "Coffee", location: "Portland" }, (search_result) => {
  // search in archive for the search just returned
  client.search_archive(search_result.search_metadata.id, (archived_search) => {
    console.log(archived_search)
  })
})
```

it prints the search from the archive.

### Account API
```javascript
const client = new GSR.GoogleSearchResults(api_key)
client.account((data) => {
  console.log(data)
})
```
it prints your account information.

## Promise and callback

This API was developped using basic callback to handle response.
And exception are just throw away with interceptor.

if you want to take advantage of the promise to block the request. 
here is how I will do.
```javascript
const util = require('util')

function getJson(parameter, resolve, reject) {  
  const client = new gsr.GoogleSearchResults(api_key)
  try {
    client.json(parameter, resolve)
  } catch (e) {
    reject(e)
  }
}

const blockFn = util.promisify(getJson)
blockFn[util.promisify.custom](parameter).then((data) => {
  expect(data.local_results[0].title.length).toBeGreaterThan(5)
  done()
}).catch((error) => {
  console.error(error)
  done()
})
```

Reference:
 * test: test/ExampleSpec.js
 * documentation: https://nodejs.org/docs/latest-v8.x/api/util.html#util_util_promisify_original

## Coding style

This API is using callback to run in non-blocking code.
Here we are trying to follow the spirit of NodeJS. 
For reference you can read this article:
 * https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
 * https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

For pratical example, you can see the test located under test/.

## Conclusion
Serp API supports Google Images, News, Shopping and more..
To enable a type of search, the field tbm (to be matched) must be set to:

 * isch: Google Images API.
 * nws: Google News API.
 * shop: Google Shopping API.
 * any other Google service should work out of the box.
 * (no tbm parameter): regular Google client.

The field `tbs` allows to customize the search even more.

[The full documentation is available here.](https://serpapi.com/search-api)

## Contributing

Contributions are welcome, feel to submit a pull request!

To run the tests:

```bash
export API_KEY="your api key"
make test
```