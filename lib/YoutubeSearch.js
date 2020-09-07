const search = require('./SerpApiSearch')

class YoutubeSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "youtube")
  }
}

module.exports.YoutubeSearch = YoutubeSearch
