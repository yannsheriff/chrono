import { connect } from 'react-redux';
import Editing from './Editing.page';
import { getPickerVisibility } from '~/redux/picker/picker.selectors';
import { getTrainings } from '~/redux/trainings/trainings.selectors';
import { RootState } from '~/redux/store';
import { getEditorName } from '~/redux/editor/editor.selectors';
import { updateTrainingName, createStep } from '~/redux/editor/editor.action';

const mapStateToProps = (state: RootState) => ({
  trainingsList: getTrainings(state),
  isPickerVisible: getPickerVisibility(state),
  trainingName: getEditorName(state),
});

const mapDispatchToProps = {
  updateTrainingName,
  createStep,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editing);
