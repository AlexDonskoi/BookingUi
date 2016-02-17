import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../actions'

const mapStateToProps = (state) => {
    return {
        items: state.hotels.items || []
    }
}

const tempMarkup = ({ items }) => (
    <ul>
        {items.map((it, ind) => (
            <li key={ind}>{it}</li>
        ))}
    </ul>
)

const HotelsList = connect(
   mapStateToProps,
   null 
)(tempMarkup)

export default HotelsList