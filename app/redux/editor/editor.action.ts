import { createAction } from 'typesafe-actions';
import { EditorStep, EditorPhase } from './editor.types';

// Training ======

export const updateTrainingName = createAction(
  'UPDATE_TRAINING_NAME',
  (name: string) => ({
    name,
  }),
)();

// Steps =============

export const createStep = createAction('NEW_STEP', (step: EditorStep) => ({
  step,
}))();

export const requestRemoveStep = createAction(
  'REQUEST_REMOVE_STEP',
  (key: string) => ({
    key,
  }),
)();

/**
 * !!! do not use in components !!!
 * Use `requestRemoveStep`instead (it clean step from phases)
 */
export const removeStep = createAction('REMOVE_STEP', (key: string) => ({
  key,
}))();

export const editStep = createAction(
  'UPDATE_STEP',
  (key: string, step: EditorStep) => ({
    key,
    step,
  }),
)();

export const editStepName = createAction(
  'UPDATE_STEP_NAME',
  (key: string, name: string) => ({
    key,
    name,
  }),
)();

export const editStepDuration = createAction(
  'UPDATE_STEP_DURATION',
  (key: string, duration: number) => ({
    key,
    duration,
  }),
)();

export const editStepPosition = createAction(
  'UPDATE_STEP_POSITION',
  (key: string, position: number) => ({
    key,
    position,
  }),
)();

export const editStepPhase = createAction(
  'UPDATE_STEP_PHASE',
  (key: string, phase: string) => ({
    key,
    phase,
  }),
)();

// Phases =============

export const createPhase = createAction('NEW_PHASE', (phase: EditorPhase) => ({
  phase,
}))();

export const removePhase = createAction('REMOVE_PHASE', (key: string) => ({
  key,
}))();

export const editPhase = createAction(
  'UPDATE_PHASE',
  (key: string, phase: EditorPhase) => ({
    key,
    phase,
  }),
)();

export const editPhaseRepetitions = createAction(
  'UPDATE_PHASE_REPETITIONS',
  (key: string, increment: boolean) => ({
    key,
    increment,
  }),
)();

export const editPhasePosition = createAction(
  'UPDATE_PHASE_POSITION',
  (key: string, position: number) => ({
    key,
    position,
  }),
)();

export const addStepToPhase = createAction(
  'ADD_STEP_TO_PHASE',
  (key: string, stepKey: string) => ({
    key,
    stepKey,
  }),
)();

export const removeStepFromPhase = createAction(
  'REMOVE_STEP_FROM_PHASE',
  (key: string, stepKey: string) => ({
    key,
    stepKey,
  }),
)();
