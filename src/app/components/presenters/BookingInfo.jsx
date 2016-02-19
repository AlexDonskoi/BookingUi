import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

const BookingInfo = ( { details }) =>  (
        <Grid>
        {
            Object.keys(details)
                .map(key => (
                     <Row>
                        <Col lg={9} md={9}>
                            {key}: {details[key]}
                        </Col>
                    </Row>
                ) )
        }
        </Grid>
);   

export default BookingInfo