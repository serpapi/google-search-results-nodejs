const search = require('./SerpApiSearch')

class WalmartSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "walmart")
  }
}

module.exports.WalmartSearch = WalmartSearch