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
import { RootState } from '~/redux/store';
import { Dispatch } from 'redux';
import { Training } from '~/components/trainingList/trainingList';

const mapStateToProps = (state: RootState) => ({
  trainingsList: getTrainings(state),
  isPickerVisible: getPickerVisibility(state),
  pickerValue: getPickerValue(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newTraining: (training: Training) => {
    dispatch(newTraining(training));
  },
  updateTraining: (trainingId: number, training: Training) => {
    dispatch(updateTraining(trainingId, training));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editing);
