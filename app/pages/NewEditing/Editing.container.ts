import { connect } from 'react-redux';
import Editing from './Editing.page';
import { getPickerVisibility } from '~/redux/picker/picker.selectors';
import { getTrainings } from '~/redux/trainings/trainings.selectors';
import { RootState } from '~/redux/store';
import { getEditorName } from '~/redux/editor/editor.selectors';
import { updateTrainingName, createStep } from '~/redux/editor/editor.action';
import { Dispatch } from 'redux';
import generateID from '~/helpers/idGenerator';

const mapStateToProps = (state: RootState) => ({
  trainingsList: getTrainings(state),
  isPickerVisible: getPickerVisibility(state),
  trainingName: getEditorName(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTrainingName,
  createStep: () =>
    dispatch(
      createStep({
        name: 'exercice',
        key: `S${generateID()}`,
        duration: 10,
        position: 1,
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editing);
