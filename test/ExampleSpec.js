const expect = require('expect')
const util = require('util')
const gsr = require('../lib/GoogleSearchResults')

describe('Google Search Results - Example', function () {
  let parameter, api_key
  beforeEach(function () {
    parameter = {
      q: "Coffee",
      location: "Austin, Texas"
    }

    // Copy your secret api_key from https://serpapi.com/dashboard
    api_key = process.env.API_KEY || "demo"
  })

  it("promisified callback function", (done) => {
    if(api_key == "demo") {
      done()
      return
    }

    function getJson(parameter, resolve, reject) {  
      const client = new gsr.GoogleSearchResults(api_key)
      try {
        client.json(parameter, resolve)
      } catch (e) {
        reject(e)
      }
    }

    const blockFn = util.promisify(getJson)
    blockFn[util.promisify.custom](parameter).then((data) => {
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    }).catch((error) => {
      console.error(error)
      done()
    })
  })


  it("callback to custom promise", (done) => {
    if(api_key == "demo") {
      done()
      return
    }

    function blockFn(parameter, callback) {}

    blockFn[util.promisify.custom] = (parameter) => {
      return new Promise((resolve, reject) => {
        let client = new gsr.GoogleSearchResults(api_key)
        try {
          client.json(parameter, resolve)
        } catch (e) {
          reject(e)
        }
      })
    }

    blockFn[util.promisify.custom](parameter).then((data) => {
      expect(data.local_results[0].title.length).toBeGreaterThan(5)
      done()
    }).catch((error) => {
      console.error(error)
      done()
    })
  })
});
