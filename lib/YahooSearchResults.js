const client = require('./SerpApiClient')

class YahooSearchResults extends client.SerpApiClient {

  constructor(api_key) {
    super(api_key, "yahoo")
  }
}

module.exports.YahooSearchResults = YahooSearchResults