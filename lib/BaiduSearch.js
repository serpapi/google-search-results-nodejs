const search = require('./SerpApiSearch')

class BaiduSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "baidu")
  }
}

module.exports.BaiduSearch = BaiduSearch