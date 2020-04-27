import { RootState } from '../store';
import { EditorState, EditorStep, EditorPhase } from './editor.types';

export const getEditorState = (state: RootState): EditorState =>
  state.editorReducer;

export const getEditorName = (state: RootState): string =>
  getEditorState(state).name;

export const getEditorSteps = (state: RootState): Array<EditorStep> =>
  getEditorState(state).steps;

export const getEditorPhases = (state: RootState): Array<EditorPhase> =>
  getEditorState(state).phases;

export const getEditorStepById = (state: RootState, key: string): EditorStep =>
  getEditorSteps(state).filter(step => step.key === key)[0];

export const getEditorPhaseById = (
  state: RootState,
  key: string,
): EditorPhase => getEditorPhases(state).filter(phase => phase.key === key)[0];

export const getEditorPhaseRepetitionsById = (
  state: RootState,
  key: string,
): number => getEditorPhaseById(state, key).repetitions;

export const getEditorPhaseStepsById = (
  state: RootState,
  key: string,
): Array<EditorStep> =>
  getEditorSteps(state).filter(step => step.phase === key);
