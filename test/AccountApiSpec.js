const expect = require('expect');
const serpapi = require('../lib/GoogleSearchResults');

describe('Account API', () => {

  let api_key
  beforeEach(() => {
    // api_key is not required for the location API
    api_key = process.env.API_KEY || "demo"
  })

  it('example', (done) => {
    if (!process.env.API_KEY) {
      done()
      return
    }

    const client = new serpapi.GoogleSearchResults(api_key)
    client.account((data) => {
      expect(data.account_id).toExist
      done()
    })
  })
})