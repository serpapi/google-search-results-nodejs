const expect = require('expect');
const serpapi = require('../lib/walmartSearch');

describe('Walmart Search', () => {
  xit("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let search = new serpapi.WalmartSearch(api_key)
      search.json({
        query: "Coffee"
      }, (data) => {
        expect(data.search_metadata.status).toEqual("Success")
        expect(data.organic_results.length).toBeGreaterThan(5)
        done()
      }, (err) => {
        fail(err)
        done()
      })
    } else {
      done()
    }
  }).timeout(10000)
});
