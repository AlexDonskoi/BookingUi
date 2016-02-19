import { combineReducers } from 'redux'
var filter = require('./filter')
var hotels = require('./hotel')
var pages = require('./pages')
var error = require('./error')

const app = () => combineReducers(
    Object.assign(
        {},
        filter,
        hotels,
        pages,
        error)
)

export default app