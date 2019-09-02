const client = require('./SerpApiClient')

class BaiduSearchResults extends client.SerpApiClient {

  constructor(api_key) {
    super(api_key, "baidu")
  }
}

module.exports.BaiduSearchResults = BaiduSearchResults