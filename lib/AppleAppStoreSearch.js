const SerpApiSearch = require('./SerpApiSearch')

class AppleAppStore extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "apple_app_store");
  }

  location(q, limit, callback) {
    throw "location is not supported for: " + this.engine ; 
  }
}

module.exports = AppleAppStore