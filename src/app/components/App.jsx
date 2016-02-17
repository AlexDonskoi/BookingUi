import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Filter from './Filter'
import HotelsList from './HotelsList'

const App = () => (
  <Grid>
    <Row>
        <Col lg={3} md={3}>
            <Filter />
        </Col>
        <Col lg={9} md={9}>
            <HotelsList />
        </Col>
        <Col>
        </Col>
    </Row>
  </Grid>
)

module.exports = App