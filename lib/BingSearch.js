const SerpApiSearch = require('./SerpApiSearch')

class BingSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "bing")
  }
}

module.exports = BingSearch