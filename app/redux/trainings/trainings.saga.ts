import { takeEvery, select } from 'redux-saga/effects';
import { updateTraining, removeTraining } from './trainings.action';
import { getType } from 'typesafe-actions';
import { storeService } from '~/helpers/storeService';
import { getTrainings } from './trainings.selectors';
import { RootState } from '../store';

export function* saveTrainings() {
  console.log('Trigger something');
}

export function* watchTrainingUpdate() {
  yield takeEvery(
    [getType(updateTraining), getType(removeTraining)],
    saveTrainings,
  );
}
