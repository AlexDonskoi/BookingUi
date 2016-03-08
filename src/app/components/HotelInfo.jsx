import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Thumbnail, Grid, Row, Col, Button, Carousel, CarouselItem } from 'react-bootstrap'
import { getHotelFacilitiesByKeys } from '../services/SettingsService'
import * as actions from '../actions'
import pageTypes from './pagetypes'

const mapStateToProps = (state, ownProps) => {
    return {
        availableCount: ownProps.hotel.roomTypes.reduce((aggr, it, ind) => aggr + it.roomsAvailable, 0)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBackClick: () => 
            dispatch(
                actions.closePage()
            ),
        onRoomsClick: () => 
            dispatch(
                actions.openPage(pageTypes.BOOKING_FORM, ownProps.hotel)
            )
    }
}

const HotelInfo = ( { hotel, availableCount, onBackClick, onRoomsClick  }) =>  (
        <Row>
            <Row>
                <Col lg={12} md={12}>
                   <Button onClick={onBackClick} bsStyle="link">Back to list</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12}>
                    {hotel.name}
                </Col>
            </Row>
             <Row>
                <Col lg={12} md={12}>
                    {hotel.location}
                </Col>
            </Row>
            <Row>
                <Col lg={10} md={10}>
                    <Carousel>
                        {
                            hotel.imageUrls.map((img, ind) => (
                                <CarouselItem key={ind}>
                                    <img alt="900x500" src={img} />
                                </CarouselItem> 
                            ))
                        }                        
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12}>
                    { hotel.description }
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6}>
                    {
                        getHotelFacilitiesByKeys(hotel.facilities)
                            .map(f => <div key={f.Key}>{f.Text}</div>)
                    }
                </Col>
               <Col lg={4} md={4}>
                    <Button onClick={onRoomsClick} disabled={!availableCount}>Show available rooms ({availableCount})</Button>
                </Col>
            </Row>
        </Row>
);
    

// HotelInfo.propTypes = {
//     hotel: PropTypes.shape({
//         Name: PropTypes.string.isRequired,
//         Image: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired
//     })
// }

export default connect(mapStateToProps, mapDispatchToProps)(HotelInfo)