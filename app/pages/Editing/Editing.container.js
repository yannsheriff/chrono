import { connect } from 'react-redux';
import {
  newTraining,
  updateTraining,
} from '../../redux/trainings/trainings.action';
import Editing from './Editing.page';

const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer,
  pickerState: state.pickerReducer,
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
