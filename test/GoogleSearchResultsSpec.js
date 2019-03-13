var expect = require('expect');
var gsr = require('./../lib/GoogleSearchResults');

describe('Google Search Results', function()
{
  let p, serp_api_key;

  before(function()
  {
    serp_api_key = process.env.SERPAPI_KEY;

    if (typeof serp_api_key === 'undefined') {
      throw new Error('Missing required environment variable SERPAPI_KEY');
    }
  });
  
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
    
    expect(serp.buildUrl(p, "json", serp_api_key)).toBe(`https://serpapi.com/search?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json&serp_api_key=${serp_api_key}`)
  })
  
  it('buildUrl with key in constructor', function() {
    let serp = new gsr.GoogleSearchResults(serp_api_key)
    expect(serp.buildUrl(p, "json")).toBe(`https://serpapi.com/search?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json&serp_api_key=${serp_api_key}`)
  })
  
  it("search", (done) => {
    let serp = new gsr.GoogleSearchResults(serp_api_key)
    serp.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })
  
  it("json", (done) => {
    let serp = new gsr.GoogleSearchResults(serp_api_key)
    serp.json(p, (data) => {
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })
  
  it("html", (done) => {
    let serp = new gsr.GoogleSearchResults(serp_api_key)
    serp.html(p, (body) => {
      expect(body).toMatch(/<\/html>/)
      done()
    })
  })
  
  it("fail:json", () => {
    let serp = new gsr.GoogleSearchResults(serp_api_key)
    try {
      serp.json({}, (data) => {
        done()
      })
    } catch(ex) {
      expect(ex.message).toBe("Error: Missing query `q` parameter")
    }
  })
});
