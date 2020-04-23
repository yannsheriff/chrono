import { connect } from 'react-redux';
import { changeScreen } from '../../redux/screen/screen.action';
import {
  removeTraining,
  newTraining,
} from '../../redux/trainings/trainings.action';
import Trainings from './Trainings.page';
import { Training } from '../../components/trainingList/trainingList';

const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer,
});

const mapDispatchToProps = dispatch => ({
  changeScreen: () => {
    dispatch(changeScreen());
  },
  removeTraining: (id: string) => {
    dispatch(removeTraining(id));
  },
  newTraining: (training: Training) => {
    dispatch(newTraining(training));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trainings);
