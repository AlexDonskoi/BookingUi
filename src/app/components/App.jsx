import React from 'react'
import { Grid, Row, Col, Tabs } from 'react-bootstrap'
import Filter from './Filter'
import Pages from './Pages'
import Error from './Error'
import BookingSearch from './BookingSearch'

const App = () => (
  <Grid>
    <Row>
        <Col lg={12} md={12}>
            <Error />    
        </Col>        
    </Row>
    <Row>
        <Col lg={12} md={12}>
            <BookingSearch />    
        </Col>        
    </Row>
    <Row>
        <Col lg={3} md={3}>
            <Filter />
        </Col>
        <Col lg={9} md={9} className="pagesContainer">
            <Pages />
        </Col>
        <Col>
        </Col>
    </Row>
  </Grid>
)

module.exports = App