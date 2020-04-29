import {
  getEditorState,
  getEditorName,
  getEditorSteps,
  getEditorPhases,
  getEditorStepById,
  getEditorPhaseById,
  getEditorPhaseRepetitionsById,
  getEditorPhaseStepsById,
  getEditorId,
} from './editor.selectors';
import { RootState } from '../store';
import { EditorState, Difficultys } from './editor.types';

describe(' serviceAccount', () => {
  describe('selectors', () => {
    const editorReducer: EditorState = {
      name: 'Entrainement',
      difficulty: Difficultys.medium,
      id: 'E_dshfjokfls',
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

    // @ts-ignore
    const store: RootState = {
      editorReducer,
    };

    describe('getEditorState', () => {
      it('should return editor state', () => {
        const serviceAccountStore: EditorState = getEditorState(store);
        expect(serviceAccountStore).toEqual(editorReducer);
      });
    });
    describe('getEditorName', () => {
      it('should return training name', () => {
        const trainingName: string = getEditorName(store);
        expect(trainingName).toEqual(editorReducer.name);
      });
    });
    describe('getEditorId', () => {
      it('should return training id', () => {
        const trainingName: string = getEditorId(store);
        expect(trainingName).toEqual(editorReducer.id);
      });
    });
    describe('getEditorSteps', () => {
      it('should return steps array', () => {
        const steps = getEditorSteps(store);
        expect(steps).toEqual(editorReducer.steps);
      });
    });
    describe('getEditorPhases', () => {
      it('should return phases array', () => {
        const phases = getEditorPhases(store);
        expect(phases).toEqual(editorReducer.phases);
      });
    });
    describe('getEditorStepById', () => {
      it('should return step', () => {
        const step = getEditorStepById(store, editorReducer.steps[0].key);
        expect(step).toEqual(editorReducer.steps[0]);
      });
    });
    describe('getEditorPhaseById', () => {
      it('should return phase', () => {
        const phase = getEditorPhaseById(store, editorReducer.phases[0].key);
        expect(phase).toEqual(editorReducer.phases[0]);
      });
    });
    describe('getEditorPhaseRepetitionsById', () => {
      it('should return phase repetition', () => {
        const repetition = getEditorPhaseRepetitionsById(
          store,
          editorReducer.phases[0].key,
        );
        expect(repetition).toEqual(editorReducer.phases[0].repetitions);
      });
    });
    describe('getEditorPhaseStepsById', () => {
      it('should return phase steps', () => {
        const steps = getEditorPhaseStepsById(
          store,
          editorReducer.phases[0].key,
        );
        expect(steps).toEqual(editorReducer.steps);
      });
    });
  });
});
