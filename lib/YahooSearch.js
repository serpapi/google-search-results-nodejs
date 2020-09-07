const search = require('./SerpApiSearch')

class YahooSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "yahoo")
  }
}

module.exports.YahooSearch = YahooSearch