import React, { PropTypes } from 'react'
import { Thumbnail, Grid, Row, Col, Button } from 'react-bootstrap'

const HotelInfo = ( { hotel, onBackClick }) =>  (
        <Grid>
            <Row>
                <Col lg={3} md={3}>
                    <Thumbnail href="#" alt="171x180" src={hotel.Image} />
                </Col>
                <Col lg={9} md={9}> {hotel.Name}</Col>
            </Row>
            <Row>
                <Col lg={12} md={12}>
                    { hotel.Description }
                </Col>
            </Row>
            <Row>
               <Col lg={12} md={12}>
                    ....
                </Col>
            </Row>
        </Grid>
);
    

// HotelInfo.propTypes = {
//     hotel: PropTypes.shape({
//         Name: PropTypes.string.isRequired,
//         Image: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired
//     })
// }

export default HotelInfo