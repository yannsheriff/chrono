import { connect } from 'react-redux';
import { requestStore } from '../../redux/loading/loading.action';
import Loader from './Loader.page';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  populateStore: () => {
    dispatch(requestStore());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);
