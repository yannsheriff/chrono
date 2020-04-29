import { takeLatest, select, put, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { Action } from 'redux';
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
  hydrateEditor,
  EditStepActions,
  EditPhaseActions,
  requestCreateStep,
  requestCreatePhase,
  createPhase,
} from './editor.actions';

import { EditorStep, EditorPhase, EditorState } from './editor.types';
// eslint-disable-next-line import/no-cycle
import {
  getEditorStepById,
  getEditorPhaseById,
  getEditorPhases,
  getEditorSteps,
} from './editor.selectors';
import { editTraining } from '../trainings/trainings.actions';
import { formatTrainingToEditor } from './editor.adapter';

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
      // eslint-disable-next-line no-case-declarations
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
          (stepKey): boolean => stepKey !== action.payload.stepKey,
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
}: ReturnType<typeof requestCreateStep>): Saga {
  // If step is in phase position by phase length
  if (payload.step.phase !== undefined) {
    const phase: EditorPhase = yield select(
      getEditorPhaseById,
      payload.step.phase,
    );
    const step: EditorStep = {
      ...payload.step,
      position: phase.steps.length,
    };

    yield put<Action>(createStep(step));
    yield put<Action>(addStepToPhase(payload.step.phase, payload.step.key));
  } else {
    // If step is not in phase calc postion
    const phases: EditorPhase[] = yield select(getEditorPhases);
    const steps: EditorStep[] = yield select(getEditorSteps);
    const soloStepsLength = steps.filter(
      (step): boolean => step.phase === undefined,
    ).length;
    const step: EditorStep = {
      ...payload.step,
      position: soloStepsLength + phases.length,
    };
    yield put<Action>(createStep(step));
  }
}

export function* createPhaseHandler({
  payload,
}: ReturnType<typeof requestCreatePhase>): Saga {
  const phases: EditorPhase[] = yield select(getEditorPhases);
  const steps: EditorStep[] = yield select(getEditorSteps);
  const soloStepsLength = steps.filter(
    (step): boolean => step.phase === undefined,
  ).length;
  const phase: EditorPhase = {
    ...payload.phase,
    position: soloStepsLength + phases.length,
  };
  yield put<Action>(createPhase(phase));
}

export function* hydrateReducerHandler({
  payload,
}: ReturnType<typeof editTraining>): Saga {
  const editor: EditorState = yield call(
    formatTrainingToEditor,
    payload.training,
  );

  yield put<Action>(hydrateEditor(editor));
}

export function* watchEditorUpdate(): Saga {
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
  yield takeLatest(getType(requestCreateStep), createStepHandler);
  yield takeLatest(getType(requestCreatePhase), createPhaseHandler);
  yield takeLatest(getType(editTraining), hydrateReducerHandler);
}
