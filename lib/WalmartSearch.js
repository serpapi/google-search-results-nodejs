const SerpApiSearch = require('./SerpApiSearch')

class WalmartSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "walmart")
  }
}

module.exports = WalmartSearch