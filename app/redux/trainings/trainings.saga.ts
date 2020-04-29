import { takeLatest, select, put, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { Action } from 'redux';
import {
  requestSaveTraining,
  updateTrainingById,
  requestNewTraining,
  newTraining,
  editTraining,
} from './trainings.actions';
// eslint-disable-next-line import/no-cycle
import {
  getEditorSteps,
  getEditorPhases,
  getEditorState,
} from '../editor/editor.selectors';
import { Training } from '~/components/trainingList/trainingList.component';
import { EditorStep, EditorPhase, EditorState } from '../editor/editor.types';
import { formatEditorPhases, formatDifficulty } from './trainings.apdapter';
import trainingFactory from './training.factory';

export function* saveTrainings(): Saga {
  const training: EditorState = yield select(getEditorState);
  const editorSteps: EditorStep[] = yield select(getEditorSteps);
  const editorPhase: EditorPhase[] = yield select(getEditorPhases);

  const formatedTraining: Training = {
    phases: formatEditorPhases(editorPhase, editorSteps),
    name: training.name,
    difficulty: formatDifficulty(training.difficulty),
    id: training.id,
  };

  yield put<Action>(updateTrainingById(training.id, formatedTraining));
}

export function* newTrainingHandler(): Saga {
  const training: Training = yield call(trainingFactory);

  yield put<Action>(newTraining(training));
  yield put<Action>(editTraining(training));
}

export function* watchTrainingUpdate(): Saga {
  yield takeLatest(getType(requestSaveTraining), saveTrainings);
  yield takeLatest(getType(requestNewTraining), newTrainingHandler);
}
