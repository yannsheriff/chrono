import { takeEvery } from 'redux-saga/effects';
import { updateTraining, removeTraining } from './trainings.action';
import { getType } from 'typesafe-actions';

export function* saveTrainings() {
  console.log('Trigger something');
}

export function* watchTrainingUpdate() {
  yield takeEvery(
    [getType(updateTraining), getType(removeTraining)],
    saveTrainings,
  );
}
