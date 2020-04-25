import { connect } from 'react-redux';
import FinishTraining from './FinishTraining.page';
import { RootState } from '~/redux/store';

const mapStateToProps = (state: RootState) => ({
  state,
});

export default connect(mapStateToProps)(FinishTraining);
