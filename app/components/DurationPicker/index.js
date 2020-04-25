import { connect } from 'react-redux';
import DurationPicker from './DurationPicker';
import { updatePickerValue, closePicker } from '~/redux/picker/picker.action';

const mapStateToProps = state => ({
  pickerState: state.pickerReducer,
});

const mapDispatchToProps = {
  updatePickerValue,
  closePicker,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DurationPicker);
