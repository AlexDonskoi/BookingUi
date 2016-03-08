import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button, Label, Thumbnail } from 'react-bootstrap'
import * as actions from '../actions'
import { toDateFormat, getBedTypeByKey, getRoomFacilitiesByKeys, getHotelFacilitiesByKeys } from '../services/settingsService'


const mapDispatchToProps = (dispatch) => {
    return {
        onBackClick: () => 
            dispatch(
                actions.closePage()
            )
    }
}


const BookingInfo = ({ details, onBackClick }) =>  (
        <table>
        <tbody>
            <tr>
                <td colSpan={2}>
                    <Button onClick={onBackClick} bsStyle="link">Back to search</Button>
                </td>
             </tr>
            <tr>
                <td>
                    <Thumbnail href="#" alt="171x180" src={details.hotelMainImageUrl} />                
                </td>
                <td><h3>{ details.hotelName }</h3>
                    { details.hotelLocation }
                </td>
            </tr>
            <tr>
                <td>Booking reference</td>
                <td>{ details.reference }</td>
            </tr>           
            <tr>
                <td>Guest name</td>
                <td>{ details.guestName }</td>
            </tr>
            <tr>
                <td>Guest phone</td>
                <td>{ details.guestPhone }</td>
            </tr>
            <tr>
                <td>Dates</td>
                <td>from{ toDateFormat(details.checkInDate) } to { toDateFormat(details.checkOutDate) }</td>
            </tr>
            <tr>
                <td>Comment</td>
                <td>{ details.comment }</td>
            </tr>
            <tr>
                <td>Rooms</td>
                <td>{ details.comment }</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>{ details.totalPrice } { details.currencyCode }</td>
            </tr>
            <tr>
                <td>Rooms:</td>
            </tr>
            {
                details.roomTypes.map(rt => (
                    <tr key={rt.id}>
                        <td colSpan={2}>
                            {rt.roomsCount } x { (getBedTypeByKey(rt.bedType) || {}).Text } bed room with
                                { getRoomFacilitiesByKeys(rt.facilities)
                                        .map(f => f.Text)
                                        .join(", ")
                                }
                        </td>
                    </tr>
                ))
            }   
          </tbody>         
        </table>
);   

export default connect(
   null,
   mapDispatchToProps 
)(BookingInfo)