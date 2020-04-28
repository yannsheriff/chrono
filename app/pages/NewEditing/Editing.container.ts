import { connect } from 'react-redux';
import Editing from './Editing.page';
import { getPickerVisibility } from '~/redux/picker/picker.selectors';
import { getTrainings } from '~/redux/trainings/trainings.selectors';
import { RootState } from '~/redux/store';
import { getEditorName } from '~/redux/editor/editor.selectors';
import {
  updateTrainingName,
  createStep,
  createPhase,
} from '~/redux/editor/editor.actions';
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
  createPhase: () =>
    dispatch(
      createPhase({
        key: `P${generateID()}`,
        position: 1,
        repetitions: 2,
        steps: [],
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editing);
