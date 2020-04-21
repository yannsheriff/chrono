import {put, takeEvery} from 'redux-saga/effects';
import {REQUEST_STORE, populateStore} from './loading.action';
import trainingData from '../../data/training';
import stats from '../../data/stats';

export function* dispatchPopulateStore() {
  console.log('Populating data ⏳');
  const data = yield trainingData();
  const stat = yield stats.loadStats();
  console.log('stats :', stat);
  yield put(populateStore(data));
  console.log('Populated ✅');
}

export function* watchPopulateStore() {
  yield takeEvery(REQUEST_STORE, dispatchPopulateStore);
}
