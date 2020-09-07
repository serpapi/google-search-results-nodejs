const serpapi = require('google-search-results-nodejs')
const api_key = process.env.API_KEY
let search = new serpapi.GoogleSearch(api_key)
search.json({
  q: "Coffee"
}, (data) => {
  if (data.search_metadata.status == "Success") {
    if (data.organic_results.length > 0) {
      console.log("ok")
      process.exit(0)
    } else {
      console.log("oops..")
      process.exit(1)
    }
  } else {
    console.log("oops..")
    process.exit(1)
  }
})