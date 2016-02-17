import { combineReducers } from 'redux'
var filter = require('./filter')
var hotels = require('./hotel')

const app = () => combineReducers(
    Object.assign(
        {},
        filter,
        hotels)
)

export default app