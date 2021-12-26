const expect = require('expect');
const serpapi = require('./../lib/main');

describe('DuckDuckGo Search', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let search = new serpapi.DuckDuckGoSearch(api_key)
      search.json({
        q: "Coffee"
      }, (data) => {
        expect(data.search_metadata.status).toEqual("Success")
        done()
      })
    } else {
      done()
    }
  }).timeout(10000)
});
