const expect = require('expect');
const serpapi = require('../lib/GoogleSearch');

describe('Search Archive API', () => {
  it('example', (done) => {
    if (!process.env.API_KEY) {
      done()
      return
    }

    var search = new serpapi.GoogleSearch(process.env.API_KEY)
    search.json({ q: "Coffee", location: "Portland" }, (search_result) => {
      // search in archive for the search just returned
      search.search_archive(search_result.search_metadata.id, (archived_search) => {
        expect(archived_search.search_metadata.id).toEqual(search_result.search_metadata.id)
        done()
      })
    })
  }).timeout(10000)
})