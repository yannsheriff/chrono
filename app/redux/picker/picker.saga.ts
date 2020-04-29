import { takeLatest, select, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { Action } from 'redux';
import { editStepDuration } from '~/redux/editor/editor.actions';
import { updatePickerValue } from './picker.actions';
import { getPickerStepId } from './picker.selectors';

export function* updatePickerValueHandler({
  payload,
}: ReturnType<typeof updatePickerValue>): Saga {
  const stepId = yield select(getPickerStepId);
  yield put<Action>(editStepDuration(stepId, payload.value));
}

export function* watchPickerUpdate(): Saga {
  yield takeLatest(getType(updatePickerValue), updatePickerValueHandler);
}
