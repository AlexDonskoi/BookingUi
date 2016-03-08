import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'react-bootstrap'
import * as actions from '../actions'
import pageTypes from './pageTypes'

const mapStateToProps = (state) => {
    return {
        value: ""
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (bookingNumber) => 
            dispatch(
                actions.searchBooking(bookingNumber, pageTypes.BOOKING_INFO)
            )
    }
}

const BookingSearch = React.createClass({
    getInitialState: function(){
        return {
            value: ""
        }
    },
    handleChange() {
        this.setState({
            value: this.refs.booking.getValue()
        });
    },
    
    getButtonState: function(){
       return !this.state.value;
    },
    
    handleSearch: function(){
        this.props.onSearch(this.state.value);
        this.setState({
            value: ""
        });
    },
    
    handleKeyPress: function(e){
        if("Enter" == e.key)
        {
            this.handleSearch();
        }
    },
    
    render: function(){
        let searchButton = <Button onClick={this.handleSearch} disabled={this.getButtonState()}>Go</Button>
        return (
            <Input type="text" ref="booking" value={this.state.value} onKeyPress={this.handleKeyPress} 
                onChange={this.handleChange} addonBefore="find booking:" buttonAfter={searchButton} />
        )
    }
})


export default connect(
   mapStateToProps,
   mapDispatchToProps 
)(BookingSearch)