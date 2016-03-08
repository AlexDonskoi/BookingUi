import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row, Grid, Pagination, ButtonToolbar, Modal, Tab, Glyphicon } from 'react-bootstrap'
import * as actions from '../actions'
import pageTypes from './pageTypes'
import HotelCard from './presenters/HotelCard'
import { getHotelFacilitiesByKeys, getSortItems } from '../services/SettingsService'

const mapStateToProps = (state) => {
    return {
        items: state.hotels.items || [],
        totalPages: Math.ceil((state.hotels.pager.total || 0) / (state.hotels.pager.perPage || 1)),
        activePage: state.hotels.pager.activePage || 1,
        isLoaded: !!state.hotels.isLoaded,
        sortItems: getSortItems().map(it => {
            return {
                Key: it.Key,
                Text: it.Text,
                IsSort: it.Key == state.hotels.pager.sort,
                Asc: state.hotels.pager.asc
            }
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (hotel) => 
            dispatch(
                actions.showHotel(hotel.hotelCode, pageTypes.HOTEL_INFO)
            ),
        onPageClick: (pageIndex) => {
            dispatch(
                actions.setPager({ activePage: pageIndex})
            );
            dispatch(
                actions.search()
            )
        },
        onSortClick: (sortItem, direction) => {
            dispatch(
                actions.setPager({ 
                    sort: sortItem,
                    asc: direction,
                    activePage: 1
                })
            );
            dispatch(
                actions.search()
            )
        }
    }
}

const getSortGlyph = ({IsSort, Asc}) =>{
    if(!IsSort)
        return null;
    return <Glyphicon glyph={ Asc ? "triangle-bottom" : "triangle-top"} />
}

const hotelList = ({ isLoaded, items, totalPages, activePage, sortItems, onClick, onPageClick, onSortClick }) => (
    <div lg={9} md={9} className={ "modal-container" }>
        <Modal
          show={isLoaded}
          aria-labelledby="contained-modal-title"
        >Loading...
        </Modal>
        
        <ButtonToolbar>
        {
            sortItems.map(it => (
                <Button key={it.Key} bsStyle="link" onClick={() => onSortClick(it.Key, !it.IsSort || !it.Asc)} >{it.Text} {getSortGlyph(it)}</Button>
            ))
        }
            
        </ButtonToolbar>
        
        {items.map(it => {
            var hotelProperties = Object.assign({}, 
                it,
                {
                    onClick: () => onClick(it),
                    facilities: getHotelFacilitiesByKeys(it.facilities)
                            .map(f => f.Text)
                })
            return(
                <HotelCard key={it.hotelCode} {...hotelProperties} />
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