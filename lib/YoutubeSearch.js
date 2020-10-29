const SerpApiSearch = require('./SerpApiSearch')

class YoutubeSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "youtube")
  }
}

module.exports = YoutubeSearch
