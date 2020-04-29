import { connect } from 'react-redux';
import DurationPicker from './DurationPicker.component';
import { updatePickerValue, closePicker } from '~/redux/picker/picker.actions';
import { RootState } from '~/redux/store';
import { getPickerValue } from '~/redux/picker/picker.selectors';

const mapStateToProps = (state: RootState) => ({
  value: getPickerValue(state),
});

const mapDispatchToProps = {
  updatePickerValue,
  closePicker,
};

export default connect(mapStateToProps, mapDispatchToProps)(DurationPicker);
