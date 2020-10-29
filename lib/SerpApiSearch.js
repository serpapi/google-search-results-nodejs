const search = require('https');
const querystring = require('querystring');
const LOCATION_API = "/locations.json"

/***
 * SerpApiSearch generic implementation to call serpapi.com 
 */
class SerpApiSearch {

  constructor(api_key = null, engine = 'google', timeout = 60000) {
    if (api_key != null) {
      this.api_key = api_key
    }
    // set search engine
    this.engine = engine

    // set default timeout
    this.defaultTimeout = timeout
  }

  // build url on the fly
  // private
  buildUrl(path, parameter, output) {
    // Set language
    parameter["source"] = "nodejs"

    // Set format
    if (output != null) {
      parameter["output"] = output
    }

    // Add api_key
    if (parameter["api_key"] == null) {
      if (this.api_key != null) {
        parameter["api_key"] = this.api_key
      }
      else if (path == LOCATION_API) {
        // skip free request
      }
      else {
        throw new Error("api_key is required. copy it from: https://serpapi.com/dashboard ")
      }
    }

    if (parameter['engine'] == null) {
      parameter['engine'] = this.engine
    }

    // build url
    return "https://serpapi.com" + path + "?" + querystring.stringify(parameter)
  }

  /***
   * setTimeout 
   * @param timeout maximum time to wait the http response in ms (default: 60000ms)
   */
  setTimeout(timeout) {
    this.defaultTimeout = timeout
  }

  /***
   * execute
   * 
   * @param path URL path
   * @param parameter query
   * @param callback handle next step
   * @param output format json|html
   */
  execute(path, parameter, callback, output) {
    let url = this.buildUrl(path, parameter, output)
    search.timeout = this.defaultTimeout
    search.get(url, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          if (resp.statusCode == 200) {
            callback(data)
          } else {
            throw data
          }
        } catch (e) {
          throw e
        }
      });

    }).on("error", (err) => {
      throw err;
    });
  }

  /***
   * Run raw search query 
   * 
   * @param [Map] parameter (see: serpapi.com)
   * @param [Function] callback
   */
  search(parameter, output, callback) {
    this.execute("/search", parameter, callback, output)
  }

  /***
   * Provide json search result in the callback
   *
   * @param [Map] parameter query
   * @param [Function] callback with search result as json 
   */
  json(parameter, callback) {
    this.search(parameter, "json", (data) => {
      let parsed = JSON.parse(data)
      callback(parsed)
    })
  }

  /***
   * Provide html search result in the callback
   *
   * @param [Map] parameter
   * @param [Function] callback with json as argument 
   * @param [String] api_key
   */
  html(parameter, callback, api_key = null) {
    this.search(parameter, "html", (data) => {
      callback(data)
    }, api_key)
  }

  /***
   * Location API returns matching location in the callback
   */
  location(q, limit, callback) {
    let query = {
      q: q,
      limit: limit
    }
    this.execute(LOCATION_API, query, (data) => {
      callback(JSON.parse(data))
    }, null, null)
  }

  /***
   * Account API returns account information in the callback
   */
  account(callback) {
    this.execute("/account", {}, (data) => {
      callback(JSON.parse(data))
    }, null, null)
  }

  /***
   * Search Archive API returns search result from the archive
   * @param search_id previous search result = search_metadata.id
   * @param callback handle next step
   * @param api_key user secret key
   */
  search_archive(search_id, callback, api_key = null) {
    this.execute("/searches/" + search_id + ".json", {}, (data) => {
      callback(JSON.parse(data))
    }, null, api_key)
  }
}

module.exports = SerpApiSearch;
