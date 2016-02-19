import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Grid, Input } from 'react-bootstrap'
import * as actions from '../actions'
import pageTypes from './pageTypes'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBooking: (state) => 
        dispatch(
             actions.tryBooking(state, pageTypes.BOOKING_INFO)
        )
    }
}

const BookingItem = ({ Id, Name, Rooms, selectedCount, onRoomSelected }) =>{
    let options = Array.from({ length: Rooms}, (v, k) => k)
    return (<Row>
        <Col lg={5} md={5}>
            { Name }
        </Col>
        <Col lg={4} md={4}>
            <Input type="select" label="Room Count"
                onChange={e => onRoomSelected(e.target.value)}
                value={selectedCount}>
                {
                    options.map(it => 
                        (<option key={it} value={it}>{it}</option>))
                }
            </Input>
        </Col>
    </Row>)
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
        this.props.onBooking(this.state);
    },   
    
    render: function(){
        let { hotel }= this.props;
        return <Grid>
            <Row>
                <Col lg={5} md={5}>
                    {hotel.Name}
                </Col>
            </Row>
            {
                hotel.RoomTypes.map(type => (
                   <BookingItem key={type.Id} {...type} selectedCount={this.state[type.Id]} onRoomSelected={(count) => this.roomCountHandle(type.Id, count)} /> 
                ) )
            }
            <Row>
               <Col lg={4} md={4} lgOffset={5} mdOffset={5}>
                   <Button bsStyle="primary" onClick={this.bookingHandle}>Booking</Button>
                </Col>
            </Row>
        </Grid>
   }
})

BookingForm = connect(
   mapStateToProps,
   mapDispatchToProps 
)(BookingForm)

export default BookingForm