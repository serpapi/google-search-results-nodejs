const expect = require('expect');
const serpapi = require('./../lib/main');

describe('Naver Search', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let search = new serpapi.NaverSearch(api_key)
      search.json({
        query: "Coffee"
      }, (data) => {
        expect(data.search_metadata.status).toEqual("Success")
        done()
      })
    } else {
      done()
    }
  }).timeout(10000)
});
