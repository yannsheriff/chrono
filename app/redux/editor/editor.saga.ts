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
import { EditorStep } from './editor.reducer';

type EditStepActions =
  | ReturnType<typeof editStepName>
  | ReturnType<typeof editStepDuration>
  | ReturnType<typeof editStepPhase>
  | ReturnType<typeof editStepPosition>;

export function* editStepHandler(action: EditStepActions): Saga {
  const { key } = action.payload;
  let newStep: EditorStep;
  const step = yield select(getEditorStepById, key);

  switch (action.type) {
    case getType(editStepName):
      newStep = { ...step, name: action.payload.name };
      break;
    case getType(editStepDuration):
      newStep = { ...step, duration: action.payload.duration };
      break;
    case getType(editStepPhase):
      newStep = { ...step, phase: action.payload.phase };
      break;
    case getType(editStepPosition):
      newStep = { ...step, position: action.payload.position };
      break;

    default:
      newStep = step;
      break;
  }
  yield put<Action>(editStep(key, newStep));
}

export function* watchEditorUpdate() {
  yield takeLatest(
    [
      getType(editStepName),
      getType(editStepDuration),
      getType(editStepPhase),
      getType(editStepPosition),
    ],
    editStepHandler,
  );
}
