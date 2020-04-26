import { Training } from '~/components/trainingList/trainingList';

import { createReducer, ActionType } from 'typesafe-actions';
import * as editorActions from './editor.action';
import id from '~/helpers/idGenerator';

export interface EditorStep {
  key: string;
  name: string;
  duration: number;
  phase: undefined | string;
  position: number;
}

enum Difficultys {
  easy,
  medium,
  hard,
}

export interface EditorPhase {
  key: string;
  steps: Array<string>;
  position: number;
  repetitions: number;
}

export interface EditorState {
  name: string;
  steps: Array<EditorStep>;
  phases: Array<EditorPhase>;
  difficulty: Difficultys;
  id: string;
}

const defaultState: EditorState = {
  name: 'Entrainement',
  difficulty: Difficultys.medium,
  id: `E${id()}`,
  steps: [
    {
      key: 'S_azerrf',
      name: 'coucou',
      duration: 5,
      phase: undefined,
      position: 1,
    },
  ],
  phases: [],
};

export type EditorActions = ActionType<typeof editorActions>;

const editorReducer = createReducer<EditorState, EditorActions>(defaultState)
  .handleAction(editorActions.updateTrainingName, (state, { payload }) => ({
    ...state,
    name: payload.name,
  }))
  .handleAction(editorActions.createStep, (state, { payload }) => ({
    ...state,
    steps: state.steps.concat(payload.step),
  }))
  .handleAction(editorActions.editStep, (state, { payload }) => ({
    ...state,
    steps: state.steps.map(step => {
      if (step.key === payload.key) return payload.step;
      return step;
    }),
  }))
  .handleAction(editorActions.removeStep, (state, { payload }) => ({
    ...state,
    steps: state.steps.filter(step => step.key !== payload.key),
  }))
  .handleAction(editorActions.createPhase, (state, { payload }) => ({
    ...state,
    phases: state.phases.concat(payload.phase),
  }))
  .handleAction(editorActions.updatePhase, (state, { payload }) => ({
    ...state,
    phases: state.phases.map(phase => {
      if (phase.key === payload.key) return payload.phase;
      return phase;
    }),
  }))
  .handleAction(editorActions.removePhase, (state, { payload }) => ({
    ...state,
    phases: state.phases.filter(phase => phase.key !== payload.key),
  }));

export default editorReducer;
