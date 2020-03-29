const expect = require('expect');
const serpapi = require('../lib/SerpApiClient');

describe('Google Search Results', () => {
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
    let client = new serpapi.SerpApiClient(null)
    expect(() => {
      client.buildUrl('/path', {}, "json", null)
    }).toThrow(/api_key/)
    done()
  }).timeout(10000)

  it('buildUrl', (done) => {
    let client = new serpapi.SerpApiClient('demo')
    expect(client.buildUrl('/path', { q: 'Coffee', location: 'Austin, Texas', api_key: 'beta' }, "json")).toMatch(/https:\/\/serpapi.com\/path\?q=Coffee&location=Austin%2C%20Texas&api_key=beta&source=nodejs&output=json/)
    done()
  }).timeout(10000)

  it('buildUrl without api_key', (done) => {
    let client = new serpapi.SerpApiClient('demo')
    expect(client.buildUrl('/path', { q: 'Coffee', location: 'Austin, Texas' }, "json")).toMatch(/https:\/\/serpapi.com\/path\?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json&api_key=demo/)
    done()
  }).timeout(10000)

  it("search", (done) => {
    let client = new serpapi.SerpApiClient(api_key, "google")
    client.setTimeout(6000);
    client.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.search_metadata.status).toEqual("Success")
      expect(data.organic_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  }).timeout(10000)

  it("json", (done) => {
    let client = new serpapi.SerpApiClient(api_key, "google")
    client.json(p, (data) => {
      expect(data.organic_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  }).timeout(10000)

  it("html", (done) => {
    let client = new serpapi.SerpApiClient(api_key, "google")
    client.html(p, (body) => {
      expect(body).toMatch(/<\/html>/)
      done()
    })
  }).timeout(10000)

});
