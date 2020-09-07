const search = require('./SerpApiSearch')

class GoogleSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "google")
  }
}

module.exports.GoogleSearch = GoogleSearch