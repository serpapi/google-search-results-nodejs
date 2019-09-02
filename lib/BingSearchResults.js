const client = require('./SerpApiClient')

class BingSearchResults extends client.SerpApiClient {

  constructor(api_key) {
    super(api_key, "bing")
  }
}

module.exports.BingSearchResults = BingSearchResults