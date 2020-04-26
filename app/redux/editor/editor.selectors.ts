import { RootState } from '../store';
import { EditorState, EditorStep, EditorPhase } from './editor.reducer';

export const getEditorState = (state: RootState): EditorState =>
  state.editorReducer;

export const getEditorName = (state: RootState): string =>
  getEditorState(state).name;

export const getEditorSteps = (state: RootState): Array<EditorStep> =>
  getEditorState(state).steps;

export const getEditorPhase = (state: RootState): Array<EditorPhase> =>
  getEditorState(state).phases;

export const getEditorStepById = (state: RootState, key: string): EditorStep =>
  getEditorSteps(state).filter(step => step.key === key)[0];
