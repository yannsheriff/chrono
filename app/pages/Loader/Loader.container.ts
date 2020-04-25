import { connect } from 'react-redux';
import { requestStore } from '~/redux/loading/loading.action';
import Loader from './Loader.page';
import { RootState } from '~/redux/store';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateStore: () => {
    dispatch(requestStore());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);
