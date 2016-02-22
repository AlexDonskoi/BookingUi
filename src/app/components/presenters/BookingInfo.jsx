import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const BookingInfo = ( { details }) =>  (
        <div>
        {
            Object.keys(details)
                .map(key => (
                     <Row key={key}>
                        <Col lg={9} md={9}>
                            {key}: {details[key]}
                        </Col>
                    </Row>
                ) )
        }
        </div>
);   

export default BookingInfo