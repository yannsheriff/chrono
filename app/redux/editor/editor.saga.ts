import { takeLatest, select, put } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  editStep,
  editStepName,
  editStepDuration,
  editStepPhase,
  editStepPosition,
  editPhase,
  editPhaseRepetitions,
  editPhasePosition,
  removeStepFromPhase,
  addStepToPhase,
  requestRemoveStep,
  removeStep,
  createStep,
} from './editor.actions';
import { getEditorStepById, getEditorPhaseById } from './editor.selectors';
import { Action } from 'redux';

import {
  EditStepActions,
  EditPhaseActions,
  EditorStep,
  EditorPhase,
} from './editor.types';

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

export function* editPhaseHandler(action: EditPhaseActions): Saga {
  const { key } = action.payload;
  let newPhase: EditorPhase;
  const phase: EditorPhase = yield select(getEditorPhaseById, key);

  switch (action.type) {
    case getType(editPhaseRepetitions):
      const increment = action.payload.increment
        ? phase.repetitions + 1
        : phase.repetitions - 1;

      newPhase = {
        ...phase,
        repetitions: increment < 0 ? 0 : increment,
      };
      break;
    case getType(editPhasePosition):
      newPhase = {
        ...phase,
        position: action.payload.position,
      };
      break;

    case getType(addStepToPhase):
      newPhase = {
        ...phase,
        steps: phase.steps.concat(action.payload.stepKey),
      };
      break;

    case getType(removeStepFromPhase):
      newPhase = {
        ...phase,
        steps: phase.steps.filter(
          stepKey => stepKey !== action.payload.stepKey,
        ),
      };
      break;

    default:
      newPhase = phase;
      break;
  }
  yield put<Action>(editPhase(key, newPhase));
}

export function* removeStepHandler({
  payload,
}: ReturnType<typeof requestRemoveStep>): Saga {
  const step: EditorStep = yield select(getEditorStepById, payload.key);
  if (step.phase !== undefined) {
    yield put<Action>(removeStepFromPhase(step.phase, step.key));
  }
  yield put<Action>(removeStep(payload.key));
}

export function* createStepHandler({
  payload,
}: ReturnType<typeof createStep>): Saga {
  const step: EditorStep = yield select(getEditorStepById, payload.step.key);
  if (step.phase !== undefined) {
    yield put<Action>(addStepToPhase(step.phase, step.key));
  }
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
  yield takeLatest(
    [
      getType(editPhaseRepetitions),
      getType(editPhasePosition),
      getType(addStepToPhase),
      getType(removeStepFromPhase),
    ],
    editPhaseHandler,
  );

  yield takeLatest(getType(requestRemoveStep), removeStepHandler);
  yield takeLatest(getType(createStep), createStepHandler);
}
