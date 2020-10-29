const serpapi = require('google-search-results-nodejs')
const api_key = process.env.API_KEY
let search = new serpapi.GoogleSearch(api_key)
search.json({
  q: "Coffee"
}, (data) => {
  if (data.search_metadata.status == "Success") {
    if (data.organic_results.length > 0) {
      console.log("ok: search executed successfully")
      process.exit(0)
    } else {
      console.log("oops something went wrong..")
      console.log(data)
      process.exit(1)
    }
  } else {
    console.log("oops request failed!")
    console.log(data)
    process.exit(1)
  }
})