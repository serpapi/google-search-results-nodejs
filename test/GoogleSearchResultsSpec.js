var expect = require('expect');
var gsr = require('./../lib/GoogleSearchResults');

describe('Google Search Results', function()
{
  let p;
  beforeEach(function()
  {
   p = {q: "Coffee", location: "Austin, Texas"}
  });
  
  it('fail:buildUrl', () => {
    let serp = new gsr.GoogleSearchResults()
    expect(() => {
      serp.buildUrl({}, "json", null)
    }).toThrow(/SERP_API/)
  })
  
  it('buildUrl', function() {
    let serp = new gsr.GoogleSearchResults()
    
    expect(serp.buildUrl(p, "json", "demo")).toBe("https://serpapi.com/search?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json&serp_api_key=demo")
  })
  
  it('buildUrl with key in constructor', function() {
    let serp = new gsr.GoogleSearchResults("demo")
    expect(serp.buildUrl(p, "json")).toBe("https://serpapi.com/search?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json&serp_api_key=demo")
  })
  
  it("search", (done) => {
    let serp = new gsr.GoogleSearchResults("demo")
    serp.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })
  
  it("json", (done) => {
    let serp = new gsr.GoogleSearchResults("demo")
    serp.json(p, (data) => {
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })
  
  it("html", (done) => {
    let serp = new gsr.GoogleSearchResults("demo")
    serp.html(p, (body) => {
      expect(body).toMatch(/<\/html>/)
      done()
    })
  })
  
  it("fail:json", () => {
    let serp = new gsr.GoogleSearchResults("demo")
    try {
      serp.json({}, (data) => {
        done()
      })
    } catch(ex) {
      expect(ex.message).toBe("Error: Missing query `q` parameter")
    }
  })
});
