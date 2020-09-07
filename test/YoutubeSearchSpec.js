const expect = require('expect');
const serpapi = require('./../lib/YoutubeSearch');

describe('Youtube Search', () => {
  it("json", (done) => {
    let api_key = process.env.API_KEY
    if (api_key != null) {
      let search = new serpapi.YoutubeSearch(api_key)
      search.json({
        search_query: "Coffee"
      }, (data) => {
        expect(data.search_metadata.status).toEqual("Success")
        expect(data.video_results.length).toBeGreaterThan(5)
        done()
      })
    } else {
      done()
    }
  }).timeout(10000)
});
