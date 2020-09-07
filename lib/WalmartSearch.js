const search = require('./SerpApiSearch')

class WalmartSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "walmart", "query")
  }
}

module.exports.WalmartSearch = WalmartSearch