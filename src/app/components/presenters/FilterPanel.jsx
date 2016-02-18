import React, { PropTypes } from 'react'
import { Panel, ListGroup, ListGroupItem, Input, Grid, Row, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

var FilterPanel = React.createClass({
  getInitialState: function(){
    return {
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };
  },

  handleStartChange: function(date){
    this.setState({
      startDate: date
    });
  },
  handleEndChange: function(date){
    this.setState({
      endDate: date
    });
  },

  render: function(){
  return (
      <div>
        <Panel header="Search" bsStyle="primary">
            <label className="control-label">From:</label>            
            <DatePicker 
                selected={this.state.startDate}
                startDate={this.state.startDate}
                endDate={this.state.endDate} 
                isClearable={true} 
                onChange={this.handleStartChange}/>
            <label className="control-label">To:</label>            
            <DatePicker 
                selected={this.state.endDate}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                isClearable={true}
                onChange={this.handleEndChange} />
            <Button bsStyle="primary" onClick={this.props.onSearch}>Search</Button>
        </Panel>
        {
            this.props.searchGroups.map(grp => (
                <Panel key={grp.Key} header={grp.Text} bsStyle="primary">
                    <ListGroup fill>
                        {
                            grp.Items.map(it => (
                                <ListGroupItem key={it.Key}>
                                    <Input type="checkbox" label={it.Text} checked={it.Checked} onChange={e => this.props.onItemSelectChanged(grp.Key, it.Key, !it.Checked)} />    
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Panel>
            ))
        }
    </div>    
)}
});
    

FilterPanel.propTypes = {
  searchGroups: PropTypes.arrayOf(
      PropTypes.shape({
            Key: PropTypes.string.isRequired,
            Text: PropTypes.string.isRequired,
            Items: PropTypes.arrayOf(
                PropTypes.shape({
                    Key: PropTypes.string.isRequired,
                    Text: PropTypes.string.isRequired,
                    Checked: PropTypes.bool.isRequired,
                }).isRequired
            ).isRequired
      }).isRequired
   ).isRequired,
   onItemSelectChanged: PropTypes.func.isRequired,
   onSearch: PropTypes.func.isRequired
}

export default FilterPanel