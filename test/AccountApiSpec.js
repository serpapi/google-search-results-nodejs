const expect = require('expect');
const serpapi = require('../lib/GoogleSearch');

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

    const search = new serpapi.GoogleSearch(api_key)
    search.account((data) => {
      expect(data.account_id).toExist
      done()
    })
  })
})