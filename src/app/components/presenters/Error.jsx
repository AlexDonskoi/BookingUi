import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const Error = React.createClass({
    render: function(){
        let { content, onDismiss } = this.props;
        if(!content)
            return <div />
         return (
            <Alert bsStyle="danger" onDismiss={onDismiss}>
                <p>{content.toString()}</p>
            </Alert>)
    }
});
    

Error.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onDismiss: PropTypes.func.isRequired
}

export default Error
