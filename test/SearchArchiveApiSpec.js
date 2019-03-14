var expect = require('expect');
var GSR = require('../lib/GoogleSearchResults');

describe('Search Archive API', () => {
  var api_key
  beforeEach(() => {
    // api_key is not required for the location API
    api_key = process.env.API_KEY || "mock"
  })

  it('example', (done) => {
    var gsr = new GSR.GoogleSearchResults(api_key)

    if (api_key != "mock") {
      // run a search
      gsr.json({q: "Coffee", location: "Portland"}, (search_result) => {
        // search in archive for the search just returned
        gsr.search_archive(search_result.search_metadata.id, (archived_search) => {
          expect(archived_search.search_metadata.id).toEqual(search_result.search_metadata.id)
          done()
        })
      })
    }
  })
})