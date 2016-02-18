import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import HotelInfo from './presenters/HotelInfo'
import pageTypes from './PageTypes'
import { Button, ButtonToolbar, Grid, Row, Col, Panel } from 'react-bootstrap'


const mapStateToProps = (state) => {
    return {
        items: state.pages || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: (key) =>
            dispatch(
                actions.closePage(key)
            )
    }
}

const getPage = ( { pageType, hotel }) => {
    switch(pageType){
       case pageTypes.HOTEL_INFO: 
        return  <HotelInfo hotel={hotel} />
       default:
        return <div />
    }
}

const pagesMarkup = ({ items, onBack, onAdd }) => {
    if(!items.length)
        return <div />;    
        
    return (
    <Col lg={9} md={9} >
        {items.map((it, ind) =>{ 
            var page = getPage(it);
            return (
            <Panel key={ind} className={ind != items.length - 1? "inactive" : ""} 
                header={<Button onClick={() => onBack(ind)}>Back</Button>}>
                {page}
            </Panel>
        )})}
    </Col>
)}

const Pages = connect(
   mapStateToProps,
   mapDispatchToProps 
)(pagesMarkup)

export default Pages