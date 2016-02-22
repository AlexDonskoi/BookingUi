import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Grid, Pagination, ButtonToolbar, Modal, Tab } from 'react-bootstrap'
import * as actions from '../actions'
import pageTypes from './pageTypes'
import HotelCard from './presenters/HotelCard'


const mapStateToProps = (state) => {
    return {
        items: state.hotels.items || [],
        isHidden: !!state.pages.length,
        totalPages: Math.ceil((state.hotels.pager.total || 0) / (state.hotels.pager.perPage || 1)),
        activePage: state.hotels.pager.activePage || 1,
        isLoaded: !!state.hotels.isLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onHeaderClick: (hotel) => 
            dispatch(
                actions.showHotel(hotel.Code, pageTypes.HOTEL_INFO)
            ),
        onAvailabilityClick: (hotel) => 
            dispatch(
                actions.openPage(pageTypes.BOOKING_FORM, 
                    Object.assign({}, hotel, { title: "Booking"}))
            ),
        onPageClick: (pageIndex) => {
            dispatch(
                actions.setPager({ activePage: pageIndex})
            );
            dispatch(
                actions.search()
            )
        },
        onSortClick: (sortItem) => {
            dispatch(
                actions.setPager({ 
                    sort: sortItem,
                    activePage: 1
                })
            );
            dispatch(
                actions.search()
            )
        }
    }
}


const hotelList = ({ isLoaded, items, isHidden, totalPages, activePage, onHeaderClick, onAvailabilityClick, onPageClick, onSortClick }) => (
    <div lg={9} md={9} className={ "modal-container" }>
        <Modal
          show={isLoaded}
          aria-labelledby="contained-modal-title"
        >Loading...
        </Modal>
        
        <ButtonToolbar>
            <Button bsStyle="link" onClick={() => onSortClick(0)}>sort by 0</Button>
            <Button bsStyle="link" onClick={() => onSortClick(1)}>sort by 1</Button>
            <Button bsStyle="link" onClick={() => onSortClick(2)}>sort by 2</Button>
        </ButtonToolbar>
        
        {items.map(it => {
            var hotelProperties = {
                hotel: it,
                availableCount: it.RoomTypes.reduce((aggr, it, ind) => aggr + it.Rooms, 0),
                onHeaderClick: () => onHeaderClick(it),
                onAvailabilityClick: () => onAvailabilityClick(it)
            }
            return(
                <HotelCard key={it.Code} {...hotelProperties} />
            )}
        )}
        <Pagination
          bsSize="medium"
          items={totalPages}
          activePage={activePage}
          onSelect={(e, selectedEvt) => onPageClick(selectedEvt.eventKey)} />
    </div>
)

const HotelsList = connect(
   mapStateToProps,
   mapDispatchToProps 
)(hotelList)

export default HotelsList