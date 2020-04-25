import { connect } from 'react-redux';
import {
  removeTraining,
  newTraining,
} from '~/redux/trainings/trainings.action';
import Trainings from './Trainings.page';
import { RootState } from '~/redux/store';
import { getTrainings } from '~/redux/trainings/trainings.selectors';

const mapStateToProps = (state: RootState) => ({
  trainings: getTrainings(state),
});

const mapDispatchToProps = {
  removeTraining,
  newTraining,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Trainings);
