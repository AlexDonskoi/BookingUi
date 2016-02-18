import { combineReducers } from 'redux'
var filter = require('./filter')
var hotels = require('./hotel')
var pages = require('./pages')

const app = () => combineReducers(
    Object.assign(
        {},
        filter,
        hotels,
        pages)
)

export default app