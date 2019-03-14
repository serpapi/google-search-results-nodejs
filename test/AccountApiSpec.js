var expect = require('expect');
var GSR = require('../lib/GoogleSearchResults');

describe('Account API', () => {

  var api_key
  beforeEach(() => {
    // api_key is not required for the location API
    api_key = process.env.API_KEY || "mock"
  })

  it('example', (done) => {
    var gsr = new GSR.GoogleSearchResults(api_key)

    if (api_key != "mock") {
      gsr.account((data) => {
        expect(data.account_id).toExist
        done()
      })
    }
  })
})