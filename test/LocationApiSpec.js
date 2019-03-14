var expect = require('expect');
var GSR = require('../lib/GoogleSearchResults');

describe('Location API', () =>
{

  beforeEach(() =>{
   // api_key is not required for the location API
   api_key = null
  })

  it('example', (done) => {
    var gsr = new GSR.GoogleSearchResults()
    gsr.location("Austin", 3, (data) => {
      expect(data[0].google_id).toEqual(200635)
      expect(data.length).toEqual(3)
      done()
    })
  })
})