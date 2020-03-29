const expect = require('expect');
const serpapi = require('./../lib/GoogleSearchResults');

describe('Google Search Results', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let client = new serpapi.GoogleSearchResults(api_key)
      client.json({
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
