import { connect } from 'react-redux';
import { editTraining } from '~/redux/trainings/trainings.actions';
import trainingList from './trainingList.component';

const mapDispatchToProps = {
  editTraining,
};

// eslint-disable-next-line prettier/prettier
export default connect(undefined, mapDispatchToProps)(trainingList);
