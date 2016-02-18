import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Grid } from 'react-bootstrap'
import * as actions from '../actions'
import pageTypes from './pageTypes'
import HotelCard from './presenters/HotelCard'


const mapStateToProps = (state) => {
    return {
        items: state.hotels.items || [],
        isHidden: !!state.pages.length
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: (hotel) => 
            dispatch(
                actions.openPage(pageTypes.HOTEL_INFO, hotel)
            ),
        onAvailabilityClick: (hotel) => 
            dispatch(
                actions.openPage(pageTypes.ROOM_AVAILABILITY, hotel)
            )
    }
}


const hotelList = ({ items, isHidden, onHeaderClick, onAvailabilityClick }) => (
    <Col lg={9} md={9} className={ isHidden ? "inactive" : ""} >
        {items.map(it => {
            var hotelProperties = {
                hotel: it,
                availableCount: it.RoomTypes.reduce((aggr, it, ind) => aggr + it.Rooms.length, 0),
                onHeaderClick: () => onHeaderClick(it),
                onAvailabilityClick: () => onAvailabilityClick(it.RoomTypes)
            }
            return(
                <HotelCard key={it.Code} {...hotelProperties} />
            )}
        )}
    </Col>
)

const HotelsList = connect(
   mapStateToProps,
   mapDispatchToProps 
)(hotelList)

export default HotelsList