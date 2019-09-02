const client = require('./SerpApiClient')

class GoogleSearchResults extends client.SerpApiClient {

  constructor(api_key) {
    super(api_key, "google")
  }
}

module.exports.GoogleSearchResults = GoogleSearchResults