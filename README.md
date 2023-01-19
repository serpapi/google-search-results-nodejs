# Google Search Node.js

[![npm version](https://badge.fury.io/js/google-search-results-nodejs.svg)](https://badge.fury.io/js/google-search-results-nodejs)
![test](https://github.com/serpapi/google-search-results-nodejs/workflows/test/badge.svg)

`google-search-results-nodejs` is a MIT-licensed [Node.js](https://nodejs.org/en/) package that meant to [scrape](https://en.wikipedia.org/wiki/Web_scraping) search results from Google, Bing, Baidu, Yahoo and [10+ more search engines](#supported-engines) with a [SerpApi](https://serpapi.com/) backend. SerpApi provides a [Playground](https://serpapi.com/playground) to get you started quickly by testing API interactively.

Find SerpApi documentation at: https://serpapi.com/search-api

Find SerpApi package at: https://www.npmjs.com/package/google-search-results-nodejs


<details>
<summary>Table of Contents</summary>

- [Requirements](#requirements) 
- [Installation](#installation) 
- [Quick Start](#quick-start) 
- [How SerpApi backend works](#how-serpapi-backend-works) 
- [How to set SerpApi key](#how-to-set-serpapi-key) 
- [Google Search API Capability](#google-search-api-capability) 
- [Supported Engines](#supported-engines) 
- [Example by Specification](#example-by-specification) 
- [Extra APIs](#extra-apis)
  - [Location API](#location-api)
  - [Search Archive API](#search-archive-api)
  - [Account API](#account-api)
- [Promise and Callback](#promise-and-callback)
- [Coding Style](#coding-style)
- [Run Regression](#run-regression)
- [Error Management](#error-management)
- [Changelog](#change-log)
</details>

## Requirements

- ES6 basic understanding
- Node 7+ and [NPM installed](https://www.npmjs.com/package/npm)

## Installation

```bash
$ npm install google-search-results-nodejs
```

## Quick start

The following example runs a search for `"coffee"` using your secret API key which you can find at [SerpApi Dashboard](https://serpapi.com/manage-api-key) page. 

[Open in the online IDE](https://replit.com/@serpapi/google-search-results-nodejs-quick-start?v=1) (Replit).

```javascript
const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("<your-serpapi-api-key>")

search.json({
 q: "Coffee", 
 location: "Austin, TX"
}, (result) => {
  console.log(result)
})
 ```

### How SerpApi backend works

![image](https://user-images.githubusercontent.com/78694043/192951614-81ea265f-a8d4-49eb-9b51-10b09868b875.png)

## How to set SerpApi key

`api_key` can be set globally using a singleton pattern:

```javascript
// https://serpapi.com/manage-api-key
const SerpApi = require("google-search-results-nodejs")
const search = new SerpApi.GoogleSearch("<your-serpapi-api-key>")
```

`api_key` can be [read from the environment variable](https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/):

```javascript
const search = new SerpApi.GoogleSearch(process.env.API_KEY);
```

`api_key` can be provided for each request:

```javascript
const SerpApi = require("google-search-results-nodejs")
const search = new SerpApi.GoogleSearch()

let result = search.json({
 api_key: "<your-serpapi-api-key>", // https://serpapi.com/manage-api-key
 q: "Coffee",                       // search query
 location: "Austin, TX",            // location of the search
}, (data) => {
  console.log(data)
})
```

## Google Search API Capability

```javascript
const SerpApi = require("google-search-results-nodejs")
const search = new SerpApi.GoogleSearch()

query_params = {
    api_key: "asdewqe1231241asm",              // Your SerpApi API key, https://serpapi.com/manage-api-key                                                                             
    q: "coffee",                               // Search query.                                                                                     
    google_domain: "google.com",               // Google domain to use.                                                                             
    location: "Austin, Texas, United States",  // Location requested for the search.                                                                
    uule: "w+CAIQICINVW5pdGVkIFN0YXRlcw",      // Google encoded location you want to use for the search.                                           
    ludocid: "CID ID",                         // ID (CID) of the Google My Business listing you want to scrape.
    lsig: "AB86z5W5r155sIcs3jqfYkm9Y8Fp",      // Force the knowledge graph map view to show up.
    device: "desktop|mobile|tablet",           // Device used when making a search.                                                                 
    hl: "en",                                  // Language of the search.                                                                           
    gl: "gl",                                  // Country of the search.                                                                            
    lr: "lang_en|lang_fr",                     // One or multiple languages to limit the search to.                                                 
    safe: "active|off",                        // Level of filtering for adult content.                                                             
    nfpr: "1|0",                               // Exclusion of results from an auto-corrected query that is spelled wrong.                          
    num: "100",                                // Number of results per page.                                                                       
    start: "20",                               // Pagination offset.                                                                                
    ijn:"1",                                   // Page number for Google Images.                                                                    
    tbm: "nws|isch|shop|lcl|vid",              // Type of search: news, images, shopping. local, video results.                                                         
    tbs: "custom to be search criteria",       // Advanced search for patents, dates, news, videos, images, apps, or text contents                  
    async: True|False,                         // Allow async request.
    no_cache: True|False                       // Force SerpApi to fetch the Google results even if a cached version is already present             
}

const callback = (data) => {
 console.log(data)                                // create a callback
}
                                                 
search.json(query_params, callback)              // Show result as JSON
search.html(query_params, callback)              // Show result as HTML file
```

## Supported Engines

| Engine                                                                       | Class name              |
|------------------------------------------------------------------------------|-------------------------|
| [Google Search Engine](https://serpapi.com/search-api)                       | `GoogleSearch()`        |
| [Google Maps](https://serpapi.com/google-maps-api)                           | `GoogleSearch()`        |
| [Google Jobs](https://serpapi.com/google-jobs-api)                           | `GoogleSearch()`        |
| [Google Trends](https://serpapi.com/google-trends-api)                       | `GoogleSearch()`        |
| [Google Autocomplete](https://serpapi.com/google-autocomplete-api)           | `GoogleScholarSearch()` |
| [Google About This Result](https://serpapi.com/google-about-this-result)     | `GoogleSearch()`        |
| [Google Lens](https://serpapi.com/google-lens-api)                           | `GoogleSearch()`        |
| [Google Finance](https://serpapi.com/google-finance-api)                     | `GoogleSearch()`        |
| [Google Related Questions](https://serpapi.com/google-related-questions-api) | `GoogleScholarSearch()` |
| [Google Scholar](https://serpapi.com/google-scholar-api)                     | `GoogleScholarSearch()` |
| [Google Play Store](https://serpapi.com/google-play-api)                     | `GoogleSearch()`        |
| [Google Product](https://serpapi.com/google-product-api)                     | `GoogleSearch()`        |
| [Google Immersive Product](https://serpapi.com/google-immersive-product-api) | `GoogleSearch()`        |
| [Google Reverse Image](https://serpapi.com/google-reverse-image)             | `GoogleSearch()`        |
| [Google Events](https://serpapi.com/google-events-api)                       | `GoogleSearch()`        |
| [Google Local Services](https://serpapi.com/google-local-services-api)       | `GoogleSearch()`        |
| [Bing](https://serpapi.com/bing-search-api)                                  | `BingSearch()`          |
| [Baidu](https://serpapi.com/baidu-search-api)                                | `BaiduSearch()`         |
| [DuckDuckGo](https://serpapi.com/duckduckgo-search-api)                      | `DuckDuckGoSearch()`    |
| [Yahoo](https://serpapi.com/yahoo-search-api)                                | `YahooSearch()`         |
| [Yandex](https://serpapi.com/yandex-search-api)                              | `YandexSearch()`        |
| [eBay](https://serpapi.com/ebay-search-api)                                  | `EbaySearch()`          |
| [Youtube](https://serpapi.com/youtube-search-api)                            | `YoutubeSearch()`       |
| [Walmart](https://serpapi.com/walmart-search-api)                            | `WalmartSearch()`       |
| [HomeDepot](https://serpapi.com/home-depot-search-api)                       | `HomeDepotSearch()`     |
| [Apple App Store](https://serpapi.com/apple-app-store)                       | `AppleAppStoreSearch()` |
| [Naver](https://serpapi.com/naver-search-api)                                | `NaverSearch()`         |
| [Yelp](https://serpapi.com/yelp-search-api)                                  | `YelpSearch()`          |


## Example by specification

We love open source, continuous integration and [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD). We are using [Mocha](https://mochajs.org/) to test [our infrastructure around the clock](https://travis-ci.org/serpapi/google-search-results-nodejs) to achieve the best [Quality of Service](https://en.wikipedia.org/wiki/Quality_of_service) (QoS).

The directory `test/` includes specification/examples.

Set your API key:

```bash
export API_KEY="<your-serpapi-api-key>"
```

Run all tests: 

```bash
npm test
```

## Extra APIs

### Location API

```javascript
const search = new SerpApi.GoogleSearch("<your-serpapi-api-key>")

search.location("Austin", 3, (data) => {
  console.log(data)
})
```

Prints the first three (3) locations matching Austin (Texas, Texas, Rochester)

```javascript
[
   {
      "id":"585069bdee19ad271e9bc072",
      "google_id":200635,
      "google_parent_id":21176,
      "name":"Austin, TX",
      "canonical_name":"Austin,TX,Texas,United States",
      "country_code":"US",
      "target_type":"DMA Region",
      "reach":5560000,
      "gps":[
         -97.7430608,
         30.267153
      ],
      "keys":[
         "austin",
         "tx",
         "texas",
         "united",
         "states"
      ]
   }, ... other results
]
```

### Search Archive API

The first search result returns a `search_id` which can be provided to get the search result from the archive. The following code will print the search from the archive.

```javascript
var search = new SerpApi.GoogleSearch("<your-serpapi-api-key>")

search.json({q: "Coffee", location: "Portland" }, (search_result) => {
  // search in archive for the search just returned
  search.search_archive(search_result.search_metadata.id, (archived_search) => {
    console.log(archived_search)
  })
})
```

### Account API

The following code snippet will print your account information.

```javascript
const search = new SerpApi.GoogleSearch("<your-serpapi-api-key>")

search.account((data) => {
  console.log(data)
})
```

## Promise and callback

This API was developped using basic callback to handle response. Exception are just throw away with interceptor.

If you want to take advantage of the promise to block the request, here is how we'll do:

```javascript
const util = require('util')

function getJson(parameter, resolve, reject) {  
  const search = new SerpApi.GoogleSearch("<your-serpapi-api-key>")
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
<details>
<summary>Practical code example using Google Images API</summary>

  [Open in the online IDE](https://replit.com/@serpapi/google-search-results-nodejs-practical-code-example?v=1) (Replit)

  ```javascript
  const SerpApi = require("google-search-results-nodejs");
  const search = new SerpApi.GoogleSearch(process.env.API_KEY); // your serpapi API key, https://serpapi.com/manage-api-key

  const searchQuery = "coffee";

  const params = {
    q: searchQuery,   // what we want to search
    engine: "google", // parsing engine
    hl: "en",         // parameter defines the language to use for the Google search
    gl: "us",         // parameter defines the country to use for the Google search
    tbm: "isch",      // parameter defines the type of search you want to do (isch - Google Images)
  };

  const getJson = () => {
    return new Promise((resolve) => {
      search.json(params, resolve);
    });
  };

  const getResults = async () => {
    const imagesResults = [];

    while (true) {
      const json = await getJson();
      if (json.images_results) {
        imagesResults.push(...json.images_results);
        params.ijn ? (params.ijn += 1) : (params.ijn = 1);
      } else break;
    }
    return imagesResults;
  };

  getResults().then((result) => console.dir(result, { depth: null }));
  ```
</details>

Reference:
 * test: `test/ExampleSpec.js`
 * documentation: https://nodejs.org/docs/latest-v8.x/api/util.html#util_util_promisify_original

## Coding style

This API is using callback to run in non-blocking code. Here we are trying to follow the spirit of NodeJS. 

Reference:
 * https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
 * https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

For pratical example, you can see the test located under `test/` folder.

## Run regression

To run the regression suite.
```bash
export API_KEY="your api key"
make test
```

## Error Management

SerpApi keeps error management simple:
1. backend service error or search fail.
2. client error.

If it's a backend error, a simple error message is returned as string in the server response. If it's a client error, then a `SerpApiClientException` is raised.

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