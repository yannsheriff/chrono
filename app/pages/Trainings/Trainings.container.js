import { connect } from 'react-redux';
import { changeScreen } from '../../redux/screen/screen.action';
import {
  removeTraining,
  newTraining,
} from '../../redux/trainings/trainings.action';
import Trainings from './Trainings.page';

const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer,
});

const mapDispatchToProps = dispatch => ({
  changeScreen: () => {
    dispatch(changeScreen());
  },
  removeTraining: id => {
    dispatch(removeTraining(id));
  },
  newTraining: training => {
    dispatch(newTraining(training));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trainings);
