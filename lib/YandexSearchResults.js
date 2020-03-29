const client = require('./SerpApiClient')

class YandexSearchResults extends client.SerpApiClient {

  constructor(api_key) {
    super(api_key, "yandex")
  }
}

module.exports.YandexSearchResults = YandexSearchResults