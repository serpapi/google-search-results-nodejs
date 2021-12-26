const SerpApiSearch = require('./SerpApiSearch')

class HomeDepotSearch extends SerpApiSearch {

  constructor(api_key) {
    super(api_key, "home_depot")
  }

  location(q, limit, callback) {
    throw "location is not supported for: " + this.engine ; 
  }
}

module.exports = HomeDepotSearch