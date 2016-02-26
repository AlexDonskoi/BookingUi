import React, { PropTypes } from 'react'
import { Thumbnail, Row, Col, Button, Panel } from 'react-bootstrap'

const HotelCard = ( { name, imageUrl, location, facilities, onClick,  }) => 
    (
        <Panel header={<Button bsStyle="link" onClick={onClick}>{name}</Button>}>
            <Row>
                <Col lg={3} md={3}>
                    <Thumbnail href="#" alt="171x180" src={imageUrl} />
                </Col>
                <Col lg={9} md={9}>
                        { location }
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3}>
                    Facilities:
                </Col>
                <Col lg={9} md={9}>
                    {
                        facilities.join(", ")
                    }
                </Col>
            </Row>
        </Panel>
        
);
    

HotelCard.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired
}

export default HotelCard