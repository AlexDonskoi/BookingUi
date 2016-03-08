import { combineReducers } from 'redux'
var filter = require('./filter')
var hotels = require('./hotel')
var page = require('./page')
var error = require('./error')

const app = () => combineReducers(
    Object.assign(
        {},
        filter,
        hotels,
        page,
        error)
)

export default app