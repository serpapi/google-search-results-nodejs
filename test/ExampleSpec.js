const expect = require('expect')
const util = require('util')
const gsr = require('../lib/GoogleSearch')

describe('Google Search - Example', function () {
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
    if (api_key == "demo") {
      done()
      return
    }

    function getJson(parameter, resolve, reject) {
      const search = new gsr.GoogleSearch(api_key)
      try {
        search.json(parameter, resolve)
      } catch (e) {
        reject(e)
      }
    }

    const blockFn = util.promisify(getJson)
    blockFn[util.promisify.custom](parameter).then((data) => {
      expect(data.organic_results[0].title.length).toBeGreaterThan(5)
      done()
    }).catch((error) => {
      console.error(error)
      done()
    })
  }).timeout(10000)


  it("callback to custom promise", (done) => {
    if (api_key == "demo") {
      done()
      return
    }

    function blockFn(parameter, callback) { }

    blockFn[util.promisify.custom] = (parameter) => {
      return new Promise((resolve, reject) => {
        let search = new gsr.GoogleSearch(api_key)
        try {
          search.json(parameter, resolve)
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
  }).timeout(10000)
});
