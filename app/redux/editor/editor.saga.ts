import { takeLatest, select, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  editStepName,
  editStep,
  editStepDuration,
  editStepPhase,
  editStepPosition,
} from './editor.action';
import { getEditorStepById } from './editor.selectors';
import { Action } from 'redux';

export function* editStepNameHandler({
  payload,
}: ReturnType<typeof editStepName>): Saga {
  const step = yield select(getEditorStepById, payload.key);
  yield put<Action>(editStep(payload.key, { ...step, name: payload.name }));
}

export function* editStepDurationHandler({
  payload,
}: ReturnType<typeof editStepDuration>): Saga {
  const step = yield select(getEditorStepById, payload.key);
  yield put<Action>(
    editStep(payload.key, { ...step, duration: payload.duration }),
  );
}

export function* editStepPhaseHandler({
  payload,
}: ReturnType<typeof editStepPhase>): Saga {
  const step = yield select(getEditorStepById, payload.key);
  yield put<Action>(editStep(payload.key, { ...step, phase: payload.phase }));
}

export function* editStepPositionHandler({
  payload,
}: ReturnType<typeof editStepPosition>): Saga {
  const step = yield select(getEditorStepById, payload.key);
  yield put<Action>(
    editStep(payload.key, { ...step, position: payload.position }),
  );
}

export function* watchEditorUpdate() {
  yield takeLatest(getType(editStepName), editStepNameHandler);
  yield takeLatest(getType(editStepDuration), editStepDurationHandler);
  yield takeLatest(getType(editStepPhase), editStepPhaseHandler);
  yield takeLatest(getType(editStepPosition), editStepPositionHandler);
}
