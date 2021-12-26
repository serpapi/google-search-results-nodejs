const SerpApiSearch = require('./SerpApiSearch')

class NaverSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "naver")
  }

  location(q, limit, callback) {
    throw "location is not supported for: " + this.engine ; 
  }
}

module.exports = NaverSearch