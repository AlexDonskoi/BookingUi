import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import HotelInfo from './HotelInfo'
import BookingInfo from './presenters/BookingInfo'
import BookingForm from './BookingForm'
import HotelsList from './HotelsList'
import pageTypes from './PageTypes'

import { Button, ButtonToolbar, Grid, Row, Col, Panel, Tabs, Tab, Glyphicon } from 'react-bootstrap'


const mapStateToProps = (state) => {
    return {
        items: state.pages || [],
        selectedTab: state.selectedTab
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (key, currentPage) =>{
            dispatch(
                actions.closePage(key)
            )
            if(key == currentPage)
             dispatch(
                actions.selectTab(-1)
            )
        }
            ,
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

const pagesMarkup = ({ items, onClose, search, selectedTab, onSelect }) => {
    if(!items.length)
    {
        return <HotelsList />
    }
    var lastPage = getPage(items[items.length - 1], items.length - 1);
            
    return (lastPage)}

const Pages = connect(
   mapStateToProps,
   mapDispatchToProps 
)(pagesMarkup)

export default Pages