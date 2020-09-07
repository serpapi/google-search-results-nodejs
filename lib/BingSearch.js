const search = require('./SerpApiSearch')

class BingSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "bing")
  }
}

module.exports.BingSearch = BingSearch