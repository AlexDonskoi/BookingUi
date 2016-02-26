import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Grid, Input, Label, Table } from 'react-bootstrap'
import * as actions from '../actions'
import pageTypes from './pageTypes'
import { getBedTypeByKey, getRoomFacilitiesByKeys } from '../services/SettingsService'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBooking: (state, index) => 
        dispatch(
             actions.tryBooking(state, index, pageTypes.BOOKING_INFO)
        )
    }
}

const BookingItem = ({ roomType, currency, selectedCount, onRoomSelected }) =>{
    let options = Array.from({ length: roomType.roomsAvailable}, (v, k) => k)
    return (<tr>
        <td>
            <h4>{ roomType.name }</h4>
            <p>
                <Label>Bed: { (getBedTypeByKey(roomType.bedType) || {}).Text }</Label>
            </p>
            <p>
                { getRoomFacilitiesByKeys(roomType.facilities)
                    .map((f, ind) => (
                        <Label key={ind}>{f.Text}</Label>
                    )) }
            </p>
        </td>
        <td>
            { roomType.price } {currency}
        </td>
        <td lg={4} md={4}>
            <Input type="select"
                onChange={e => onRoomSelected(e.target.value)}
                value={selectedCount}>
                {
                    options.map(it => 
                        (<option key={it} value={it}>{it}</option>))
                }
            </Input>
        </td>
    </tr>)
}


let BookingForm = React.createClass({
    
    getInitialState: function(){
        return {}
    },
    
    roomCountHandle: function(typeId, count){
        this.setState({
            [typeId]: count
        })
    },
    
    bookingHandle: function(){
        this.props.onBooking(this.state, this.props.index);
    },   
    
    render: function(){
        let { hotel }= this.props;
        let selectedRooms = Object.keys(this.state).reduce((aggr, it) => aggr + this.state[it], 0);
        return <div>
            <Row>
                <Col lg={10} md={10}>
                    <h3>{hotel.name}</h3>
                </Col>
            </Row>
            <Table striped bordered condensed hover>
            <thead>
            <tr>
                <th lg={5} md={5}>Room type</th>
                <th lg={3} md={3}>Price</th>
                <th lg={4} md={4}>Room Count</th>
            </tr>
            </thead>
            <tbody>
            {
                hotel.roomTypes.map(type => (
                   <BookingItem key={type.id} roomType={type} currency={hotel.currencyCode} selectedCount={this.state[type.Id]} onRoomSelected={(count) => this.roomCountHandle(type.Id, count)} /> 
                ) )
            }
            <tr>
                <td colSpan={2}>
                </td>
                <td>
                    <Button bsStyle="primary" disabled={!selectedRooms} onClick={this.bookingHandle}>Booking</Button>
                </td>
            </tr>
            </tbody>
            </Table>
        </div>
   }
})

BookingForm = connect(
   mapStateToProps,
   mapDispatchToProps 
)(BookingForm)

export default BookingForm