const expect = require('expect');
const serpapi = require('./../lib/YandexSearchResults');

describe('Yandex Search Results', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let client = new serpapi.YandexSearchResults(api_key)
      client.json({
        text: "Coffee"
      }, (data) => {
        expect(data.search_metadata.status).toEqual("Success")
        expect(data.organic_results.length).toBeGreaterThan(5)
        done()
      })
    } else {
      done()
    }
  }).timeout(10000)
});
