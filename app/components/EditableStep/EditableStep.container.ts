import { connect } from 'react-redux';
import { openPicker } from '~/redux/picker/picker.action';
import EditableStep from './EditableStep.component';
import { RootState } from '~/redux/store';
import {
  getPickerStepId,
  getPickerValue,
} from '~/redux/picker/picker.selectors';

const mapStateToProps = (state: RootState) => {
  return {
    pickerStepId: getPickerStepId(state),
    pickerValue: getPickerValue(state),
  };
};

const mapDispatchToProps = {
  openPicker,
};

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableStep);

export default componentContainer;
