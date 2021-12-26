'use strict'

const BaiduSearch = require('./BaiduSearch')
const BingSearch = require('./BingSearch')
const EbaySearch = require('./EbaySearch')
const GoogleSearch = require('./GoogleSearch')
const SerpApiSearch = require('./SerpApiSearch')
const WalmartSearch = require('./WalmartSearch')
const YahooSearch = require('./YahooSearch')
const YandexSearch = require('./YandexSearch')
const YoutubeSearch = require('./YoutubeSearch')
const HomeDepotSearch = require('./HomeDepotSearch')
const NaverSearch = require('./NaverSearch')
const AppleAppStoreSearch = require('./AppleAppStoreSearch')
const DuckDuckGoSearch = require('./DuckDuckGoSearch')

module.exports = {
  SerpApiSearch,
  GoogleSearch,
  BaiduSearch,
  BingSearch,
  DuckDuckGoSearch,
  YahooSearch,
  YandexSearch,
  YoutubeSearch,
  EbaySearch,
  WalmartSearch,
  HomeDepotSearch,
  NaverSearch,
  AppleAppStoreSearch
}