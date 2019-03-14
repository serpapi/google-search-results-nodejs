var expect = require('expect');
var gsr = require('./../lib/GoogleSearchResults');

describe('Google Search Results', function()
{
  let p;
  beforeEach(function()
  {
   p = {q: "Coffee", location: "Austin, Texas"}

   // Copy your secret api_key from https://serpapi.com/dashboard
   api_key = process.env.API_KEY || "demo"
  });
  
  it('fail:buildUrl', () => {
    let serp = new gsr.GoogleSearchResults()
    expect(() => {
      serp.buildUrl({}, "json", null)
    }).toThrow(/api_key/)
  })
  
  it('buildUrl', function() {
    let serp = new gsr.GoogleSearchResults()
    
    expect(serp.buildUrl(p, "json", api_key)).toMatch(/https:\/\/serpapi.com\/search\?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json/)
  })
  
  it('buildUrl with key in constructor', function() {
    let serp = new gsr.GoogleSearchResults(api_key)
    expect(serp.buildUrl(p, "json")).toMatch(/https:\/\/serpapi.com\/search\?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json/)
  })
  
  it("search", (done) => {
    this.timeout(6000);
    let serp = new gsr.GoogleSearchResults(api_key)
    serp.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })
  
  it("json", (done) => {
    let serp = new gsr.GoogleSearchResults(api_key)
    serp.json(p, (data) => {
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })
  
  it("html", (done) => {
    let serp = new gsr.GoogleSearchResults(api_key)
    serp.html(p, (body) => {
      expect(body).toMatch(/<\/html>/)
      done()
    })
  })
  
  it("fail:json", () => {
    let serp = new gsr.GoogleSearchResults(api_key)
    try {
      serp.json({}, (data) => {
        done()
      })
    } catch(ex) {
      expect(ex.message).toBe("Error: Missing query `q` parameter")
    }
  })
});
