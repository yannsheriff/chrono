import { connect } from 'react-redux';
import {
  removeTraining,
  newTraining,
} from '~/redux/trainings/trainings.action';
import Trainings from './Trainings.page';
import { Training } from '~/components/trainingList/trainingList';
import { Dispatch } from 'redux';
import { RootState } from '~/redux/store';
import { getTrainings } from '~/redux/trainings/trainings.selectors';

const mapStateToProps = (state: RootState) => ({
  trainings: getTrainings(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTraining: (id: number) => {
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
