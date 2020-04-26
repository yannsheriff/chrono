import { takeLatest, select, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { editStepDuration } from '~/redux/editor/editor.action';
import { Action } from 'redux';
import { updatePickerValue } from './picker.action';
import { getPickerStepId } from './picker.selectors';

export function* updatePickerValueHandler({
  payload,
}: ReturnType<typeof updatePickerValue>): Saga {
  const stepId = yield select(getPickerStepId);
  yield put<Action>(editStepDuration(stepId, payload.value));
}

export function* watchPickerUpdate() {
  yield takeLatest(getType(updatePickerValue), updatePickerValueHandler);
}
