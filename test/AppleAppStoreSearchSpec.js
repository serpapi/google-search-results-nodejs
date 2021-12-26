const expect = require('expect');
const serpapi = require('./../lib/main');

describe('AppleAppStoreSearch', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key == null) {
      done()
      return
    }
    let search = new serpapi.AppleAppStoreSearch(api_key)
    search.json({
      term: "Laptop"
    }, (data) => {
      expect(data.search_metadata.status).toEqual("Success")
      done()
    })
  }).timeout(10000);

  it("location is not supported", (done) => {
    let api_key = process.env.API_KEY
    if (api_key == null) {
      done()
      return
    }
    let search = new serpapi.AppleAppStoreSearch(api_key)
    try {
      search.location('Austin, TX', 5, {})
      fail("location is not supported")
    } catch (e) {
      expect(e).toMatch(/location is not supported/)
      done()
    }
  }).timeout(1000);
});
