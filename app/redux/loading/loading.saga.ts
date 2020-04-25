import { put, takeEvery } from 'redux-saga/effects';
import { REQUEST_STORE } from './loading.action';
import trainingData from '~/data/training';
import stats from '~/data/stats';
import { hydrateStore } from '../trainings/trainings.action';
import { Action } from 'redux';

export function* dispatchPopulateStore() {
  console.log('Populating data ⏳');
  const data = yield trainingData();
  const stat = yield stats.loadStats();
  console.log('stats :', stat);
  yield put<Action>(hydrateStore(data));
  console.log('Populated ✅');
}

export function* watchPopulateStore() {
  yield takeEvery(REQUEST_STORE, dispatchPopulateStore);
}
