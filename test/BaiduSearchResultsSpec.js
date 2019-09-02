const expect = require('expect');
const serpapi = require('./../lib/BaiduSearchResults');

describe('Baidu Search Results', () => {
  let p, api_key;
  beforeEach(() => {
    p = {
      q: "Coffee",
      location: "Austin, Texas"
    }

    // Copy your secret api_key from https://serpapi.com/dashboard
    api_key = process.env.API_KEY || "demo"
  });

  it("json", (done) => {
    let client = new serpapi.BaiduSearchResults(api_key)
    client.json(p, (data) => {
      expect(data.organic_results.length).toBeGreaterThan(5)
      done()
    })
  }).timeout(10000)
});
