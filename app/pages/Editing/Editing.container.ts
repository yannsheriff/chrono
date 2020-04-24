import { connect } from 'react-redux';
import {
  newTraining,
  updateTraining,
} from '../../redux/trainings/trainings.action';
import Editing from './Editing.page';
import {
  getPickerVisibility,
  getPickerValue,
} from '../../redux/picker/picker.selectors';
import { getTrainings } from '../../redux/trainings/trainings.selectors';

const mapStateToProps = state => ({
  trainingsList: getTrainings(state),
  isPickerVisible: getPickerVisibility(state),
  pickerValue: getPickerValue(state),
});

const mapDispatchToProps = dispatch => ({
  newTraining: training => {
    dispatch(newTraining(training));
  },
  updateTraining: (trainingId, training) => {
    dispatch(updateTraining(trainingId, training));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editing);
