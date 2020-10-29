const SerpApiSearch = require('./SerpApiSearch')

class BaiduSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "baidu")
  }
}

module.exports = BaiduSearch