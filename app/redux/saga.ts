import { all } from 'redux-saga/effects';

import { watchTrainingUpdate } from './trainings/trainings.saga';
import { watchPopulateStore } from './loading/loading.saga';

// Notice how we now only export the rootSaga,
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchTrainingUpdate(), watchPopulateStore()]);
}