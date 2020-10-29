const SerpApiSearch = require('./SerpApiSearch')

class EbaySearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "ebay")
  }
}

module.exports = EbaySearch