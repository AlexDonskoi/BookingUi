import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Filter from './Filter'
import HotelsList from './HotelsList'
import Pages from './Pages'
import Error from './Error'

const App = () => (
  <Grid>
    <Row>
        <Col lg={12} md={12}>
            <Error />    
        </Col>        
    </Row>
    <Row>
        <Col lg={3} md={3}>
            <Filter />
        </Col>
        <Col lg={9} md={9} className="pagesContainer">
            <HotelsList />
            <Pages />
        </Col>
        <Col>
        </Col>
    </Row>
  </Grid>
)

module.exports = App