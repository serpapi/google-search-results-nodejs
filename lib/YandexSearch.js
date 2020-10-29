const SerpApiSearch = require('./SerpApiSearch')

class YandexSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "yandex")
  }
}

module.exports = YandexSearch