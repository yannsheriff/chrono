import { takeEvery, select, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { Action } from 'redux';
import { requestSaveTraining, updateTrainingById } from './trainings.actions';
// eslint-disable-next-line import/no-cycle
import { getEditorId } from '../editor/editor.selectors';
import { Training } from '~/components/trainingList/trainingList';

export function* saveTrainings(): Saga {
  const trainingId: string = yield select(getEditorId);
  const newTraining: Training = {
    phases: [],
    name: '',
    difficulty: 'Difficultys.hard',
    id: 'ci',
  };

  yield put<Action>(updateTrainingById(trainingId, newTraining));
}

export function* watchTrainingUpdate(): Saga {
  yield takeEvery(getType(requestSaveTraining), saveTrainings);
}
