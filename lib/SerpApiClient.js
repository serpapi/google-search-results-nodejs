const client = require('https');
const querystring = require('querystring');
const LOCATION_API = "/locations.json"

/***
 * Google search results with serpapi.com
 */
class SerpApiClient {

  constructor(api_key = null, engine = 'google') {
    if (api_key != null) {
      this.api_key = api_key
    }

    this.engine = 'google'

    this.defaultTimeout = 60000
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
        // skip free api
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
    client.timeout = this.defaultTimeout
    client.get(url, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        if (resp.statusCode == 200) {
          callback(data)
          return
        }
        let msg = JSON.parse(data)
        throw new Error(msg.error)
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
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
      callback(JSON.parse(data))
    })
  }


  /***
   * @deprecated
   * Provide json search result in the callback
   *
   * @param [Map] parameter query
   * @param [Function] callback with search result as json 
   * @param [String] api_key
   */
  json(parameter, callback, api_key = null) {
    parameter["api_key"] = api_key
    this.search(parameter, "json", (data) => {
      callback(JSON.parse(data))
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

module.exports.SerpApiClient = SerpApiClient;
