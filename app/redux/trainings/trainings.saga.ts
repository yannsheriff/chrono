import { takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { updateTraining, removeTraining } from './trainings.actions';

export function* saveTrainings(): Saga {
  yield console.log('Trigger something');
}

export function* watchTrainingUpdate(): Saga {
  yield takeEvery(
    [getType(updateTraining), getType(removeTraining)],
    saveTrainings,
  );
}
