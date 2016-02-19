import { connect } from 'react-redux'
import * as actions from '../actions'
import ErrorBox from './presenters/Error'

const mapStateToProps = (state) => {
    return {
        content: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDismiss: () => {
            dispatch(
                actions.setError(null)
            );
        }
    }
}

const Error = connect(
   mapStateToProps,
   mapDispatchToProps 
)(ErrorBox)

export default Error