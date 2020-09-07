const expect = require('expect');
const serpapi = require('./../lib/EbaySearch');

describe('Ebay Search', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let search = new serpapi.EbaySearch(api_key)
      search.json({
        _nkw: "Coffee"
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
