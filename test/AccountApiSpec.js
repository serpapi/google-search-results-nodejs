const expect = require('expect');
const GSR = require('../lib/GoogleSearchResults');

describe('Account API', () => {

  const api_key
  beforeEach(() => {
    // api_key is not required for the location API
    api_key = process.env.API_KEY || "demo"
  })

  it('example', (done) => {
    if (api_key != "demo") {
      done()
      return
    }

    const client = new GSR.GoogleSearchResults(api_key)
    client.account((data) => {
      expect(data.account_id).toExist
      done()
    })
  })
})