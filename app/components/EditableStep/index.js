import { connect } from 'react-redux'
import { openPicker } from '../../redux/actions/pickerActions'
import EditableStep from './EditableStep'

const mapStateToProps = state => {
    return {
        pickerState: state.pickerReducer
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        openPicker: (id, value ) => {
            dispatch(openPicker(id, value))
        }
    }
  }
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditableStep)
  
  export default componentContainer
  