const SerpApiSearch = require('./SerpApiSearch')

class GoogleSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "google")
  }
}

module.exports = GoogleSearch