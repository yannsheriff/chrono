import { connect } from 'react-redux';
import {
  removeTraining,
  newTraining,
} from '../../redux/trainings/trainings.action';
import Trainings from './Trainings.page';
import { Training } from '../../components/trainingList/trainingList';

const mapStateToProps = state => ({
  trainingsState: state.trainingsReducer,
});

const mapDispatchToProps = dispatch => ({
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
