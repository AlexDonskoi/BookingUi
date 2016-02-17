import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import FilterPanel from './presenters/FilterPanel'
import SearchGroups from '../services/stub/SearchGroups'

const mapStateToProps = (state) => {
    return {
        startDate: state.filter.startDate,
        endDate: state.filter.endDate,
        searchGroups: SearchGroups.map(grp => {
            return {
                Key: grp.Key,
                Text: grp.Text,
                Items: grp.Items.map(it => {
                    return {
                        Key: it.Key,
                        Text: it.Text,
                        Checked: !!(state.filter[grp.Key] || []).find(v => v == it.Key)
                    }
                })
            }
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemSelectChanged: (groupKey, itemKey, isChecked) => {
            dispatch(
                actions.toggleFilterItem(groupKey, itemKey, isChecked)
            );
            dispatch(
                actions.search()
            )
        },
        onSearch: () => 
            dispatch(
                actions.search()
            )
    }
}

const Filter = connect(
   mapStateToProps,
   mapDispatchToProps 
)(FilterPanel)

export default Filter