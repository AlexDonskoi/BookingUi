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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBooking: (state) => 
        dispatch(
             actions.tryBooking(state, pageTypes.BOOKING_INFO)
        ),
        onBackClick: () => 
            dispatch(
                actions.openPage(pageTypes.HOTEL_INFO, ownProps.hotel)
            )
    }
}

const BookingItem = ({ roomType, currency, selectedCount, isValid, onRoomSelected }) =>{
    let options = Array.from({ length: roomType.roomsAvailable}, (v, k) => k)
    let style = isValid ? {} : { bsStyle: "error"};                    
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
                {...style}
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

const textRefs = {
        name: {
            "Label": "Guest Name", 
            "Regex": /.+/     
        },
        phone: {
            "Label": "guest phone", 
            "Regex": /^\d+$/          
        },
        comment: {
            "Label": "Comment"     
        }
    }

let BookingForm = React.createClass({
    
    getInitialState: function(){
        return {
            Rooms:{}
        }
    },
    
    roomCountHandle: function(typeId, count){
        this.setState({
            Rooms: Object.assign({}, this.state.Rooms, {[typeId]: count})
        })
    },
    
    bookingHandle: function(){
        let { hotel } = this.props;
        let bookingInfo = Object.assign(
            {
                code: hotel.code,
                rooms: this.state.Rooms
            },
            Object.keys(textRefs).reduce(
                (aggr, it) => {
                    aggr[it] = this.state[it];
                    return aggr
                    }, 
                {})
        );
        this.props.onBooking(bookingInfo);
    },  
    
    changeHandle: function(inputKey){
        this.setState({
            [inputKey]:  this.refs[inputKey].getValue()
        });
    },  
    
    isInputValid: function(inputKey){
        let inputConfig = textRefs[inputKey];
        if(inputConfig && inputConfig.Regex)
        {
            return (this.state[inputKey] || "").match(inputConfig.Regex);
        }
        return true;
    },
    isSelectValid: function(){
        return Object.keys(this.state.Rooms).reduce((aggr, it) => aggr + this.state.Rooms[it], 0) > 0
    },
    
    isFormValid: function(){
        return !(!this.isSelectValid()
            || Object.keys(textRefs).find(key => !this.isInputValid(key))); 
    },   
    
    render: function(){
        let { hotel, onBackClick } = this.props;
        return <div>
            <Row>
                <Col lg={10} md={10}>
                    <Button onClick={onBackClick} bsStyle="link">Back to hotel info</Button>
                </Col>
             </Row>
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
                   <BookingItem key={type.id} roomType={type} isValid={this.isSelectValid()} currency={hotel.currencyCode} selectedCount={this.state[type.id]} onRoomSelected={(count) => this.roomCountHandle(type.id, count)} /> 
                ) )
            }
            {
                Object.keys(textRefs).map(key => {
                    let style = this.isInputValid(key) ? {} : { bsStyle: "error"};
                    return(
                    <   tr key={key}>
                            <td colSpan={2}>
                                {textRefs[key].Label}
                            </td>
                            <td>
                            <Input type="text" ref={key} {...style} onChange={() => this.changeHandle(key)} />
                            </td>
                        </tr> 
                    )
                } )
            }
            <tr>
                <td colSpan={2}>
                </td>
                <td>
                    <Button bsStyle="primary" disabled={!this.isFormValid()} onClick={this.bookingHandle}>Booking</Button>
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