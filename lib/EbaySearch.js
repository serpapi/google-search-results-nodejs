const search = require('./SerpApiSearch')

class EbaySearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "ebay")
  }
}

module.exports.EbaySearch = EbaySearch