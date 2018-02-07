const https = require('https');
const querystring = require('querystring');

/***
 * Google search results with SerpApi.com
 */
class GoogleSearchResults {

  constructor(serp_api_key = null)
  {
    if(serp_api_key != null)
    {
      this.serp_api_key = serp_api_key;
    }
  }
  
  buildUrl(parameter, output, serp_api_key)
  {
    // Set language
    parameter["source"] = "nodejs"
    
    // Set format
    parameter["output"] = output
    
    // Add serp_api_key
    if(serp_api_key)
    {
      parameter["serp_api_key"] = serp_api_key
    }
    else if(this.serp_api_key)
    {
      parameter["serp_api_key"] = this.serp_api_key
    }
    else
    {
      throw "SERP_API_KEY is not defined"
    }
    
    // build url
    return "https://serpapi.com/search?" + querystring.stringify(parameter)
  }
  
  /***
   * Run google search
   * @param [Map] parameter see: serpapi.com
   * @param [String] (optional) serp api user key
   * @return 
   */
  search(parameter, output, callback, serp_api_key = null)
  {
    let url = this.buildUrl(parameter, output, serp_api_key)
    https.get(url, (resp) => {
      let data = '';
     
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
     
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        callback(data);
      });
     
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      throw err;
    });
  }
  
  json(parameter, callback, serp_api_key = null)
  {
    this.search(parameter, "json", (data) => {
      callback(JSON.parse(data))
    }, serp_api_key)
  }
  
  jsonWithImages(parameter, callback, serp_api_key = null)
  {
    this.search(parameter, "json_with_images", (data) => {
      callback(JSON.parse(data))
    }, serp_api_key)
  }
  
  html(parameter, callback, serp_api_key = null)
  {
    this.search(parameter, "html", (data) => {
      callback(data)
    }, serp_api_key)
  }
}

module.exports.GoogleSearchResults = GoogleSearchResults;
