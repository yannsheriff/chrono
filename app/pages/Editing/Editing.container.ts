import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { newTraining, updateTraining } from '~/redux/trainings/trainings.actions';
import Editing from './Editing.page';
import { getPickerVisibility, getPickerValue } from '~/redux/picker/picker.selectors';
import { getTrainings } from '~/redux/trainings/trainings.selectors';
import { RootState } from '~/redux/store';
import { Training } from '~/components/trainingList/trainingList';

const mapStateToProps = (
  state: RootState,
): {
  trainingsList: Training[];
  isPickerVisible: boolean;
  pickerValue: number;
} => ({
  trainingsList: getTrainings(state),
  isPickerVisible: getPickerVisibility(state),
  pickerValue: getPickerValue(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): {
  newTraining: (training: Training) => unknown;
  updateTraining: (trainingId: number, training: Training) => unknown;
} => ({
  newTraining: (training: Training): void => {
    dispatch(newTraining(training));
  },
  updateTraining: (trainingId: number, training: Training): void => {
    dispatch(updateTraining(trainingId, training));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editing);
