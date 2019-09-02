const expect = require('expect');
const serpapi = require('./../lib/GoogleSearchResults');

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
    let client = new serpapi.GoogleSearchResults()
    expect(() => {
      client.buildUrl('/path', {}, "json", null)
    }).toThrow(/api_key/)
    done()
  })

  it('buildUrl', (done) => {
    let client = new serpapi.GoogleSearchResults('demo')
    expect(client.buildUrl('/path', { q: 'Coffee', location: 'Austin, Texas', api_key: 'beta' }, "json")).toMatch(/https:\/\/serpapi.com\/path\?q=Coffee&location=Austin%2C%20Texas&api_key=beta&source=nodejs&output=json/)
    done()
  })

  it('buildUrl without api_key', (done) => {
    let client = new serpapi.GoogleSearchResults('demo')
    expect(client.buildUrl('/path', { q: 'Coffee', location: 'Austin, Texas' }, "json")).toMatch(/https:\/\/serpapi.com\/path\?q=Coffee&location=Austin%2C%20Texas&source=nodejs&output=json&api_key=demo/)
    done()
  })

  it("search", (done) => {
    let client = new serpapi.GoogleSearchResults(api_key)
    client.setTimeout(6000);
    client.search(p, "json", (raw) => {
      let data = JSON.parse(raw)
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })

  it("json", (done) => {
    let client = new serpapi.GoogleSearchResults(api_key)
    client.json(p, (data) => {
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    })
  })

  it("html", (done) => {
    let client = new serpapi.GoogleSearchResults(api_key)
    client.html(p, (body) => {
      expect(body).toMatch(/<\/html>/)
      done()
    })
  })

  xit("fail:json", (done) => {
    try {
      let client = new serpapi.GoogleSearchResults(api_key)
      let fn = (data) => {
        done()
      }
      client.json({}, fn)
    } catch (ex) {
      expect(ex.message).toBe("Error: Missing query `q` parameter")
      done()
    }
  })
});
