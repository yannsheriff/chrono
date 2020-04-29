import { connect } from 'react-redux';
import {
  removeTraining,
  newTraining,
  requestNewTraining,
} from '~/redux/trainings/trainings.actions';
import TrainingsPage from './Trainings.page';
import { RootState } from '~/redux/store';
import { getTrainings } from '~/redux/trainings/trainings.selectors';
import { Training } from '~/components/trainingList/trainingList';

const mapStateToProps = (
  state: RootState,
): {
  trainings: Training[];
} => ({
  trainings: getTrainings(state),
});

const mapDispatchToProps = {
  removeTraining,
  newTraining,
  requestNewTraining,
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(TrainingsPage);
