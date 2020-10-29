const SerpApiSearch = require('./SerpApiSearch')

class YahooSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "yahoo")
  }
}

module.exports = YahooSearch