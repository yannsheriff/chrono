import {
  put, takeEvery, all, select
} from 'redux-saga/effects';
import { REQUEST_STORE, populateStore } from '../actions/loading';
import { UPDATE_TRAINING, REMOVE_TRAINING } from '../actions/trainingsActions';
import { storeService } from '../../helpers/storeService';
import trainingData from '../../data/training';
import stats from '../../data/stats';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* saveTrainings(action) {
  console.log('Saving data ⏳');
  const state = yield select();
  console.log('state', state.trainingsReducer.trainings);
  yield storeService.save(state.trainingsReducer.trainings);
  console.log('Saved ✅');
}

export function* dispatchPopulateStore() {
  console.log('Populating data ⏳');
  const data = yield trainingData();
  yield put(populateStore(data));
  console.log('Populated ✅');
}

export function* watchTrainingUpdate() {
  yield takeEvery([UPDATE_TRAINING, REMOVE_TRAINING], saveTrainings);
}

export function* watchPopulateStore() {
  yield takeEvery(REQUEST_STORE, dispatchPopulateStore);
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchTrainingUpdate(),
    watchPopulateStore()
  ]);
}
