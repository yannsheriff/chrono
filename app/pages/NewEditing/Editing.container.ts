import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';
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
import generateID from '~/helpers/idGenerator';
import { Training } from '~/components/trainingList/trainingList';
import { requestSaveTraining } from '~/redux/trainings/trainings.actions';

const mapStateToProps = (
  state: RootState,
): {
  trainingsList: Training[];
  isPickerVisible: boolean;
  trainingName: string;
} => ({
  trainingsList: getTrainings(state),
  isPickerVisible: getPickerVisibility(state),
  trainingName: getEditorName(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): {
  createStep: () => unknown;
  createPhase: () => unknown;
  updateTrainingName: (name: string) => unknown;
  saveTraining: () => unknown;
} => ({
  updateTrainingName: (name): ActionType<typeof updateTrainingName> =>
    dispatch(updateTrainingName(name)),

  saveTraining: (): ActionType<typeof requestSaveTraining> =>
    dispatch(requestSaveTraining()),

  createStep: (): ActionType<typeof createStep> =>
    dispatch(
      createStep({
        name: 'exercice',
        key: `S${generateID()}`,
        duration: 10,
        position: 1,
      }),
    ),

  createPhase: (): ActionType<typeof createPhase> =>
    dispatch(
      createPhase({
        key: `P${generateID()}`,
        position: 1,
        repetitions: 2,
        steps: [],
      }),
    ),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
