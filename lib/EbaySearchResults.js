const client = require('./SerpApiClient')

class EbaySearchResults extends client.SerpApiClient {

  constructor(api_key) {
    super(api_key, "ebay")
  }
}

module.exports.EbaySearchResults = EbaySearchResults