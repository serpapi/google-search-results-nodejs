const expect = require('expect');
const GSR = require('../lib/GoogleSearchResults');

describe('Search Archive API', () => {
  var api_key
  beforeEach(() => {
    // api_key is not required for the location API
    api_key = process.env.API_KEY || "demo"
  })

  it('example', (done) => {
    if (api_key != "demo") {
      done()
      return
    }

    var client = new GSR.GoogleSearchResults(api_key)
    client.json({q: "Coffee", location: "Portland" }, (search_result) => {
      // search in archive for the search just returned
      client.search_archive(search_result.search_metadata.id, (archived_search) => {
        expect(archived_search.search_metadata.id).toEqual(search_result.search_metadata.id)
        done()
      })
    })
  })
})