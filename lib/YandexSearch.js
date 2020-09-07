const search = require('./SerpApiSearch')

class YandexSearch extends search.SerpApiSearch {

  constructor(api_key) {
    super(api_key, "yandex")
  }
}

module.exports.YandexSearch = YandexSearch