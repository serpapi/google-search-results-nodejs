var expect = require('expect');
var gsr = require('./../lib/GoogleSearchResults');

describe('Google Search Results', function()
{
  let p;
  beforeEach(function()
  {
   p = {q: "Coffee", location: "Portland"}
  });
  
  it('fail:buildUrl', function() {
    let serp = new gsr.GoogleSearchResults()
    expect(() => {
      serp.buildUrl({}, "json", null)
    }).toThrow(/SERP_API/)
  })
  
  it('buildUrl', function() {
    let serp = new gsr.GoogleSearchResults()
    
    expect(serp.buildUrl(p, "json", "demo")).toBe("https://serpapi.com/search?q=Coffee&location=Portland&source=nodejs&output=json&serp_api_key=demo")
  })
  
  it('buildUrl with key in constructor', function() {
    let serp = new gsr.GoogleSearchResults("demo")
    expect(serp.buildUrl(p, "json")).toBe("https://serpapi.com/search?q=Coffee&location=Portland&source=nodejs&output=json&serp_api_key=demo")
  })
  
  it("search", (done) => {
    let serp = new gsr.GoogleSearchResults("demo")
    serp.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.organic_results[0].title).toBe("Coffee - Wikipedia")
      done()
    })
  })
  
  it("json", (done) => {
    let serp = new gsr.GoogleSearchResults("demo")
    serp.json(p, (data) => {
      expect(data.organic_results[0].title).toBe("Coffee - Wikipedia")
      done()
    })
  })
  
  it("jsonWithImages", (done) => {
    let serp = new gsr.GoogleSearchResults("demo")
    serp.jsonWithImages(p, (data) => {
      expect(data.organic_results[0].title).toBe("Coffee - Wikipedia")
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
});
