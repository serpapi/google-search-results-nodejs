var expect = require('expect');
var gsr = require('../lib/GoogleSearchResults');

describe('Google Search Results - Example', function () {
  let parameter;
  beforeEach(function () {
    parameter = {
      q: "Coffee",
      location: "Austin, Texas"
    }

    // Copy your secret api_key from https://serpapi.com/dashboard
    api_key = process.env.API_KEY || "demo"
  })

  it("callback to blocking function", (done) => {
    function blockFn(p) {
      let serp = new gsr.GoogleSearchResults(api_key)
      var result
      serp.json(p, (data) => {
        result = data
        console.log('done.')
        done()
      })

      // wait until completion
      while (result == undefined) { }

      // return result
      return result
    }

    let rsp = blockFn(parameter)
    expect(rsp.local_results[0].title.length).toBeGreaterThan(5)
    done()
  })

});
