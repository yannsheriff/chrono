import { put, takeEvery, all } from "redux-saga/effects";
import { REQUEST_STORE, populateStore } from "../actions/loading";
import trainingData from "../../data/training";
import stats from "../../data/stats";
import { watchTrainingUpdate } from "./trainings/trainings.saga";

export function* dispatchPopulateStore() {
  console.log("Populating data ⏳");
  const data = yield trainingData();
  const stat = yield stats.loadStats();
  console.log("stats :", stat);
  yield put(populateStore(data));
  console.log("Populated ✅");
}

export function* watchPopulateStore() {
  yield takeEvery(REQUEST_STORE, dispatchPopulateStore);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchTrainingUpdate(), watchPopulateStore()]);
}
