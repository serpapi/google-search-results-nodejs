const expect = require('expect');
const serpapi = require('./../lib/BingSearch');

describe('Bing Search', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let search = new serpapi.BingSearch(api_key)
      search.json({
        q: "Coffee"
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
