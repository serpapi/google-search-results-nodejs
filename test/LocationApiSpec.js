const expect = require('expect');
const serpapi = require('../lib/main');

describe('Location API', () => {
  it('example', (done) => {
    var search = new serpapi.GoogleSearch()
    search.location("Austin", 3, (data) => {
      //console.log(data)
      expect(data[0].google_id).toEqual(1026201)
      expect(data.length).toEqual(3)
      done()
    })
  })
})