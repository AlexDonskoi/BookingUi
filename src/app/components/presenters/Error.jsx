import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const Error = React.createClass({
    render: function(){
        let { content, onDismiss } = this.props;
        if(!content)
            return <div />
         return (
            <Alert bsStyle="danger" onDismiss={onDismiss}>
                {content}
            </Alert>)
    }
});
    

Error.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    onDismiss: PropTypes.func.isRequired
}

export default Error
