const client = require('https');
const querystring = require('querystring');
const LOCATION_API = "/locations.json"

/***
 * Google search results with SerpApi.com
 */
class GoogleSearchResults {

  constructor(api_key = null) {
    if (api_key != null) {
      this.api_key = api_key;
    }
  }

  // build url on the fly
  // private
  buildUrl(path, parameter, output, api_key) {
    // Set language
    parameter["source"] = "nodejs"

    // Set format
    if (output != null) {
      parameter["output"] = output
    }

    // Add api_key
    if (api_key != null) {
      parameter["api_key"] = api_key
    }
    else if (this.api_key != null) {
      parameter["api_key"] = this.api_key
    }
    else if (path == LOCATION_API) {
      // skip free api
    }
    else {
      throw new Error("api_key is required. Copy it from: https://serpapi.com/dashboard ")
    }
    // build url
    return "https://serpapi.com" + path + "?" + querystring.stringify(parameter)
  }

  execute(path, parameter, callback, output, api_key) {
    let url = this.buildUrl(path, parameter, output, api_key)
    console.log(url)
    client.timeout = 60000
    client.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        if (resp.statusCode == 200) {
          callback(data)
          return
        }
        msg = JSON.parse(data)
        throw new Error(msg.error)
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      throw err;
    });
  }

  /***
   * run google search
   * 
   * @param [Map] parameter (see: serpapi.com)
   * @param [Function] callback 
   * @param [String] (optional) serp api user key 
   */
  search(parameter, output, callback, api_key = null) {
    this.execute("/search", parameter, callback, output, api_key)
  }

  /***
   * json search result
   *
   * @param [Map] parameter
   * @param [Function] callback with json as argument 
   * @param [String] api_key
   */
  json(parameter, callback, api_key = null) {
    this.search(parameter, "json", (data) => {
      callback(JSON.parse(data))
    }, api_key)
  }

  /***
   * html search result
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
   * Location API
   */
  location(q, limit, callback) {
    this.execute(LOCATION_API, { q: q, limit: limit }, (data) => {
      callback(JSON.parse(data))
    }, null, null)
  }

  /***
   * Account API
   */
  account(callback) {
    this.execute("/account", {}, (data) => {
      callback(JSON.parse(data))
    }, null, null)
  }

  /***
   * Search Archive API
   * @param search_id previous search result = search_metadata.id
  */
  search_archive(search_id, callback, api_key = null) {
    this.execute("/searches/" + search_id + ".json", {}, (data) => {
      callback(JSON.parse(data))
    }, null, api_key)
  }
}

module.exports.GoogleSearchResults = GoogleSearchResults;
