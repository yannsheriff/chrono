import { removeTraining } from '../../redux/actions/trainingsActions';
import { connect } from 'react-redux';
import EditableList from './EditableList.page';

const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer,
});

const mapDispatchToProps = dispatch => ({
  removeTraining: id => {
    dispatch(removeTraining(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableList);
