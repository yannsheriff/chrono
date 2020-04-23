import { connect } from 'react-redux';
import FinishTraining from './FinishTraining.page';

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FinishTraining);
