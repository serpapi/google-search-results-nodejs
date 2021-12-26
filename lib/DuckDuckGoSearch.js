const SerpApiSearch = require('./SerpApiSearch')

class DuckDuckGoSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "duckduckgo")
  }
}

module.exports = DuckDuckGoSearch