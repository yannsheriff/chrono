import { expectSaga } from 'redux-saga-test-plan';
import { select, call } from 'redux-saga/effects';
import { watchTrainingUpdate } from './trainings.saga';
import {
  requestSaveTraining,
  updateTrainingById,
  requestNewTraining,
  editTraining,
  newTraining,
} from './trainings.actions';
import { Training } from '~/components/trainingList/trainingList.component';
import { EditorState, Difficultys } from '../editor/editor.types';
import {
  getEditorState,
  getEditorSteps,
  getEditorPhases,
} from '../editor/editor.selectors';
import { formatEditorPhases, formatDifficulty } from './trainings.apdapter';
import trainingFactory from './training.factory';

describe('Editor', () => {
  const defaultState: EditorState = {
    name: 'Entrainement',
    difficulty: Difficultys.medium,
    id: 'id',
    steps: [
      {
        key: 'S_azerrf',
        name: 'coucou',
        duration: 5,
        phase: 'P_azerrf',
        position: 1,
      },
    ],
    phases: [
      {
        key: 'P_azerrf',
        steps: ['S_azerrf'],
        position: 2,
        repetitions: 2,
      },
    ],
  };

  const formatedTraining: Training = {
    phases: formatEditorPhases(defaultState.phases, defaultState.steps),
    name: defaultState.name,
    difficulty: formatDifficulty(defaultState.difficulty),
    id: defaultState.id,
  };

  const GET_EDITOR = select(getEditorState);
  const GET_STEPS = select(getEditorSteps);
  const GET_PHASES = select(getEditorPhases);

  describe('saga', () => {
    it('should dispatch update training with formated training', async () => {
      await expectSaga(watchTrainingUpdate)
        .provide([
          [GET_EDITOR, defaultState],
          [GET_STEPS, defaultState.steps],
          [GET_PHASES, defaultState.phases],
        ])
        .put(updateTrainingById(defaultState.id, formatedTraining))
        .dispatch(requestSaveTraining())
        .silentRun(0);
    });

    it('should dispatch new training and edit training', async () => {
      const training = {
        phases: [],
        name: 'Nouvel entrainement',
        difficulty: 'Easy',
        id: 'abcdef',
      };
      await expectSaga(watchTrainingUpdate)
        .provide([[call(trainingFactory), training]])
        .put(newTraining(training))
        .put(editTraining(training))
        .dispatch(requestNewTraining())
        .silentRun(0);
    });
  });
});
