import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import HotelInfo from './presenters/HotelInfo'
import BookingInfo from './presenters/BookingInfo'
import BookingForm from './BookingForm'
import HotelsList from './HotelsList'
import pageTypes from './PageTypes'

import { Button, ButtonToolbar, Grid, Row, Col, Panel, Tabs, Tab } from 'react-bootstrap'


const mapStateToProps = (state) => {
    return {
        items: state.pages || [],
        selectedTab: state.selectedTab
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: (key) =>
            dispatch(
                actions.closePage(key)
            ),
        onSelect: (key) =>
            dispatch(
                actions.selectTab(key)
            )
    }
}

const getPage = ( { pageType, info }, index) => {
    switch(pageType){
       case pageTypes.HOTEL_INFO: 
        return  <HotelInfo hotel={info} index={index}/>
       case pageTypes.BOOKING_FORM: 
        return  <BookingForm hotel={info} index={index}/>
       case pageTypes.BOOKING_INFO: 
        return  <BookingInfo details={info} index={index}/>
       default:
        return <div />
    }
}

const pagesMarkup = ({ items, onBack, search, selectedTab, onSelect }) => {
    return (
    <Tabs defaultActiveKey={-1} activeKey={selectedTab} onSelect={onSelect} lg={9} md={9} animation={false}>
        <Tab eventKey={-1} key={-1} title="Results">
            <HotelsList />
        </Tab>
        {items.map((it, ind) =>{ 
            var page = getPage(it, ind);
            return (
            <Tab eventKey={ind} key={ind} title={it.info.title}>      
                {page}
            </Tab>
        )})}
    </Tabs>
)}

const Pages = connect(
   mapStateToProps,
   mapDispatchToProps 
)(pagesMarkup)

export default Pages