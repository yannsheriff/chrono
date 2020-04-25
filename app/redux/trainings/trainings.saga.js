import { takeEvery, select } from 'redux-saga/effects';
import { UPDATE_TRAINING, REMOVE_TRAINING } from './trainings.action';
import { storeService } from '~/helpers/storeService';

export function* saveTrainings(action) {
  console.log('Saving data ⏳');
  const state = yield select();
  console.log('state', state.trainingsReducer.trainings);
  yield storeService.save(state.trainingsReducer.trainings);
  console.log('Saved ✅');
}

export function* watchTrainingUpdate() {
  yield takeEvery([UPDATE_TRAINING, REMOVE_TRAINING], saveTrainings);
}
