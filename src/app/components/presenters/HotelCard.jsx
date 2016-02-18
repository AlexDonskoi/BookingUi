import React, { PropTypes } from 'react'
import { Thumbnail, Grid, Row, Col, Button, Panel } from 'react-bootstrap'

const HotelCard = ( { hotel, availableCount, onHeaderClick, onAvailabilityClick }) => 
    (
        <Panel header={<Button bsStyle="link" onClick={onHeaderClick}>{hotel.Name}</Button>}>
            <Grid>
                <Row>
                    <Col lg={3} md={3}>
                        <Thumbnail href="#" alt="171x180" src={hotel.Image} />
                    </Col>
                    <Col lg={9} md={9}>
                        <Row>
                            <Col lg={12} md={12}>
                                { hotel.Description }
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12}>
                                <Button bsStyle="default" disabled={!availableCount} onClick={onAvailabilityClick}>Show all ({availableCount}) available rooms</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </Panel>
        
);
    

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        RoomTypes: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
    }),
    onHeaderClick: PropTypes.func.isRequired,
    onAvailabilityClick: PropTypes.func.isRequired
}

export default HotelCard