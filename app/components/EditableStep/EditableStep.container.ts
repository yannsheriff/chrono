import { connect } from 'react-redux';
import { openPicker } from '~/redux/picker/picker.action';
import EditableStep from './EditableStep.component';
import { RootState } from '~/redux/store';
import {
  getPickerStepId,
  getPickerValue,
} from '~/redux/picker/picker.selectors';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => {
  return {
    pickerStepId: getPickerStepId(state),
    pickerValue: getPickerValue(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openPicker: (id: string, value: any) => {
      dispatch(openPicker(id, value));
    },
  };
};

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableStep);

export default componentContainer;
