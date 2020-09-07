const expect = require('expect');
const serpapi = require('../lib/SerpApiSearch');

describe('Google Search', () => {
  let p, api_key;
  beforeEach(() => {
    p = {
      q: "Coffee",
      location: "Austin, Texas"
    }

    // Copy your secret api_key from https://serpapi.com/dashboard
    api_key = process.env.API_KEY || "demo"
  });

  it('fail:buildUrl', (done) => {
    let search = new serpapi.SerpApiSearch(null)
    expect(() => {
      search.buildUrl('/path', {}, "json", null)
    }).toThrow(/api_key/)
    done()
  }).timeout(10000)

  it('buildUrl', (done) => {
    let search = new serpapi.SerpApiSearch(this.api_key)
    expect(search.buildUrl('/path', { q: 'Coffee', location: 'Austin, Texas', api_key: 'beta' }, "json")).toMatch(/https:\/\/serpapi.com\/path\?q=Coffee&location=Austin%2C%20Texas&api_key=beta&source=nodejs&output=json/)
    done()
  }).timeout(10000)

  it('buildUrl without api_key', (done) => {
    let search = new serpapi.SerpApiSearch(this.api_key)
    try {
      search.buildUrl('/path', { q: 'Coffee', location: 'Austin, Texas' }, "json")
      fail("error should have been raised")
    } catch (e) {
      expect(e.toString()).toMatch(/api_key is required/)
    }
    done()
  }).timeout(10000)

  it("search", (done) => {
    let search = new serpapi.SerpApiSearch(api_key, "google")
    search.setTimeout(6000);
    search.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.search_metadata.status).toEqual("Success")
      expect(data.organic_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  }).timeout(10000)

  it("json", (done) => {
    let search = new serpapi.SerpApiSearch(api_key, "google")
    search.json(p, (data) => {
      expect(data.organic_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  }).timeout(10000)

  it("html", (done) => {
    let search = new serpapi.SerpApiSearch(api_key, "google")
    search.html(p, (body) => {
      expect(body).toMatch(/<\/html>/)
      done()
    })
  }).timeout(10000)

});
