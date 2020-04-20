import { connect } from 'react-redux';
import DurationPicker from './DurationPicker';
import { updatePickerValue, closePicker } from '../../redux/actions/pickerActions';

const mapStateToProps = state => ({
  pickerState: state.pickerReducer
});

const mapDispatchToProps = dispatch => ({
  updatePickerValue: (value) => {
    dispatch(updatePickerValue(value));
  },
  closePicker: () => {
    dispatch(closePicker());
  }
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DurationPicker);

export default componentContainer;
