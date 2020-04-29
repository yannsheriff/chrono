import expect from 'expect';
import editorReducer from './editor.reducer';
import {
  updateTrainingName,
  createStep,
  editStep,
  removeStep,
  createPhase,
  editPhase,
  removePhase,
  hydrateEditor,
} from './editor.actions';

import { EditorState, Difficultys } from './editor.types';

describe('Editor', () => {
  const defaultState: EditorState = {
    name: 'Entrainement',
    difficulty: Difficultys.medium,
    id: 'E_dzfedgf',
    steps: [
      {
        key: 'S_azerrf',
        name: 'coucou',
        duration: 5,
        phase: 'P_azerrf',
        position: 1,
      },
    ],
    phases: [
      {
        key: 'P_azerrf',
        steps: ['S_azerrf'],
        position: 2,
        repetitions: 2,
      },
    ],
  };

  describe('reducer', () => {
    it('should initialize correcly', () => {
      // @ts-ignore - {} is not a known action
      const editorState = editorReducer(defaultState, {});
      expect(editorState).toEqual(defaultState);
    });

    it('should change training name', () => {
      const editorState = editorReducer(
        defaultState,
        updateTrainingName('test'),
      );
      expect(editorState.name).toEqual('test');
    });

    it('should create a step ', () => {
      const editorState = editorReducer(
        defaultState,
        createStep({
          key: 'S_azerert',
          name: 'coucou',
          duration: 5,
          phase: undefined,
          position: 1,
        }),
      );
      expect(editorState.steps.length).toEqual(2);
    });

    it('should update step ', () => {
      const editorState = editorReducer(
        defaultState,
        editStep('S_azerrf', {
          key: 'S_ajnlml',
          name: 'test',
          duration: 5,
          phase: undefined,
          position: 1,
        }),
      );
      expect(editorState.steps[0].key).toEqual('S_ajnlml');
    });

    it('should remove a step ', () => {
      const editorState = editorReducer(defaultState, removeStep('S_azerrf'));
      expect(editorState.steps.length).toEqual(0);
    });

    it('should create a phase ', () => {
      const editorState = editorReducer(
        defaultState,
        createPhase({
          key: 'P_fvbngbv',
          steps: [],
          position: 2,
          repetitions: 2,
        }),
      );
      expect(editorState.phases.length).toEqual(2);
    });

    it('should update a phase ', () => {
      const editorState = editorReducer(
        defaultState,
        editPhase('P_azerrf', {
          key: 'P_fvbngbv',
          steps: [],
          position: 2,
          repetitions: 2,
        }),
      );
      expect(editorState.phases[0].key).toEqual('P_fvbngbv');
    });

    it('should remove a phase ', () => {
      const editorState = editorReducer(defaultState, removePhase('P_azerrf'));
      expect(editorState.phases.length).toEqual(0);
    });

    it('should hydrate state', () => {
      const trainingToHydrate: EditorState = {
        name: 'Entrainement',
        difficulty: Difficultys.medium,
        id: 'E_dzfedgf',
        steps: [],
        phases: [],
      };
      const editorState = editorReducer(
        defaultState,
        hydrateEditor(trainingToHydrate),
      );
      expect(editorState).toEqual(trainingToHydrate);
    });
  });
});
