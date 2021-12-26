# Google Search Node.js

[![npm version](https://badge.fury.io/js/google-search-results-nodejs.svg)](https://badge.fury.io/js/google-search-results-nodejs)
![test](https://github.com/serpapi/google-search-results-nodejs/workflows/test/badge.svg)

This NodeJS module is designed to scrape and parse Google, Bing and Baidu results using [SerpApi](https://serpapi.com).
This Ruby Gem is meant to scrape and parse Google results using [SerpApi](https://serpapi.com).
The following services are provided:
 * [Search API](https://serpapi.com/search-api)
 * [Location API](https://serpapi.com/locations-api)
 * [Search Archive API](https://serpapi.com/search-archive-api)
 * [Account API](https://serpapi.com/account-api)

SerpApi provides a [script builder](https://serpapi.com/demo) to get you started quickly.

This npm package is meant to scrape and parse Google results using [SerpApi](https://serpapi.com).
The following services are provided:
 * [Search API](https://serpapi.com/search-api)
 * [Location API](https://serpapi.com/locations-api)
 * [Search Archive API](https://serpapi.com/search-archive-api)
 * [Account API](https://serpapi.com/account-api)

SerpApi provides a [script builder](https://serpapi.com/demo) to get you started quickly.

[The full documentation is available here.](https://serpapi.com/search-api)

[Link to NodeJS Package](https://www.npmjs.com/package/google-search-results-nodejs)

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
const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("Your Private Key")
search.json({
 q: "Coffee", 
 location: "Austin, TX"
}, (result) => {
  console.log(result)
})
 ```
This example runs a search about "coffee" using your secret api key.

The SerpApi service (backend)
 - searches on Google using the search: q = "coffee"
 - parses the messy HTML responses
 - return a standardizes JSON response
The class GoogleSearch
 - Format the request to SerpApi server
 - Execute GET http request
 - Parse JSON into Ruby Hash using JSON standard library provided by Ruby
Et voila..

Alternatively, you can search:
- Baidu using BaiduSearch class
- Bing using BingSearch class
- DuckDuckGo using DuckDuckGoSearch class
- Yahoo using YahooSearch class
- Ebay using EbaySearch class
- Yandex using YandexSearch class
- HomeDepot using HomeDepotSearch class
- GoogleScholar using GoogleScholarSearch class
- Youtube using YoutubeSearch class
- Walmart using WalmartSearch
- Apple App Store using AppleAppStoreSearch class
- Naver using NaverSearch class

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
The SerpApi api_key can be set globally using a singleton pattern.
```javascript
const SerpApi = require('google-search-results-nodejs')
let search = new SerpApi.GoogleSearch("Your Private Key")
```

The SerpApi api_key can be provided for each request
```javascript
const SerpApi = require('google-search-results-nodejs')
let search = new SerpApi.GoogleSearch()
let result = search.json({
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

const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch()

// create a callback
callback = (data) => {
 console.log(data)
}

// Show result as JSON
search.json(query_params, callback)

// Show result as HTML file
search.html(query_params, callback)
```

[the full documentation](https://serpapi.com/search-api)

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
const search = new SerpApi.GoogleSearch(api_key)
search.location("Austin", 3, (data) => {
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
var search = new SerpApi.GoogleSearch(api_key)
search.json({q: "Coffee", location: "Portland" }, (search_result) => {
  // search in archive for the search just returned
  search.search_archive(search_result.search_metadata.id, (archived_search) => {
    console.log(archived_search)
  })
})
```

it prints the search from the archive.

### Account API
```javascript
const search = new SerpApi.GoogleSearch(api_key)
search.account((data) => {
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
  const search = new SerpApi.GoogleSearch(api_key)
  try {
    search.json(parameter, resolve)
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

## Run regression

To run the regression suite.
```bash
export API_KEY="your api key"
make test
```

## Change log
 * 2.1 
   * add support for Naver, HomeDepot, AppleStoreApp, DuckDuckGo
   * defeature location if it is not supported by the search engine
 * 2.0.1 
  * fix classes loading.
 * 2.0
   * Refractor class name: SearchResult -> Search
 * 1.2
   * stable version to support all the basic search API.

## Conclusion
SerpApi supports Google Images, News, Shopping and more..
To enable a type of search, the field tbm (to be matched) must be set to:

 * isch: Google Images API.
 * nws: Google News API.
 * shop: Google Shopping API.
 * any other Google service should work out of the box.
 * (no tbm parameter): regular Google search.

The field `tbs` allows to customize the search even more.

[The full documentation is available here.](https://serpapi.com/search-api)
