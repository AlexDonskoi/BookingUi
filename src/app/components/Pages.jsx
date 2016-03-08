import React from 'react'
import { connect } from 'react-redux'
import HotelInfo from './HotelInfo'
import BookingInfo from './BookingInfo'
import BookingForm from './BookingForm'
import HotelsList from './HotelsList'
import pageTypes from './PageTypes'

const mapStateToProps = (state) => {
    return {
        page: state.page
    }
}

const getPage = ( { pageType, info }) => {
    switch(pageType){
       case pageTypes.HOTEL_INFO: 
        return  <HotelInfo hotel={info} />
       case pageTypes.BOOKING_FORM: 
        return  <BookingForm hotel={info} />
       case pageTypes.BOOKING_INFO: 
        return  <BookingInfo details={info} />
       default:
        return <div />
    }
}

const pagesMarkup = ({ page }) => {
    if(!page)
    {
        return <HotelsList />
    }            
    return (getPage(page))
 }

const Pages = connect(
   mapStateToProps,
   null 
)(pagesMarkup)

export default Pages