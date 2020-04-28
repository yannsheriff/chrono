import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { watchEditorUpdate } from './editor.saga';
import {
  editStepName,
  editStep,
  editStepPosition,
  editStepDuration,
  editStepPhase,
  editPhaseRepetitions,
  editPhase,
  editPhasePosition,
  addStepToPhase,
  removeStepFromPhase,
  requestRemoveStep,
  removeStep,
  createStep,
} from './editor.actions';
import { EditorStep, EditorPhase } from './editor.types';
import {
  getEditorStepById,
  getEditorPhaseById,
} from './editor.selectors';

describe('Editor', () => {
  const step: EditorStep = {
    key: 'a',
    name: 'a',
    duration: 1,
    position: 1,
    phase: 'a',
  };
  const phase: EditorPhase = {
    key: 'a',
    position: 1,
    steps: ['a'],
    repetitions: 1,
  };

  const GET_STEP = select(getEditorStepById, step.key);
  const GET_PHASE = select(getEditorPhaseById, phase.key);

  describe('saga', () => {
    describe('editStepHandler', () => {
      it('should dispatch editStep with modified step name', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_STEP, step]])
          .put(editStep(step.key, { ...step, name: 'toto' }))
          .dispatch(editStepName(step.key, 'toto'))
          .silentRun(0);
      });
      it('should dispatch editStep with modified step position', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_STEP, step]])
          .put(editStep(step.key, { ...step, position: 2 }))
          .dispatch(editStepPosition(step.key, 2))
          .silentRun(0);
      });
      it('should dispatch editStep with modified step duration', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_STEP, step]])
          .put(editStep(step.key, { ...step, duration: 2 }))
          .dispatch(editStepDuration(step.key, 2))
          .silentRun(0);
      });
      it('should dispatch editStep with modified step phase', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_STEP, step]])
          .put(editStep(step.key, { ...step, phase: 'toto' }))
          .dispatch(editStepPhase(step.key, 'toto'))
          .silentRun(0);
      });
    });

    describe('editPhaseHandler', () => {
      it('should dispatch editPhase with modified phase amount + 1', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_PHASE, phase]])
          .put(editPhase(step.key, { ...phase, repetitions: 2 }))
          .dispatch(editPhaseRepetitions(phase.key, true))
          .silentRun(0);
      });
      it('should dispatch editPhase with modified phase amount - 1', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_PHASE, phase]])
          .put(editPhase(step.key, { ...phase, repetitions: 0 }))
          .dispatch(editPhaseRepetitions(phase.key, false))
          .silentRun(0);
      });
      it('should dispatch editStep with modified phase position', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_PHASE, phase]])
          .put(editPhase(step.key, { ...phase, position: 2 }))
          .dispatch(editPhasePosition(phase.key, 2))
          .silentRun(0);
      });
      it('should dispatch editStep with new step', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_PHASE, phase]])
          .put(
            editPhase(step.key, {
              ...phase,
              steps: phase.steps.concat('b'),
            }),
          )
          .dispatch(addStepToPhase(phase.key, 'b'))
          .silentRun(0);
      });
      it('should dispatch editStep without the removed step', async () => {
        await expectSaga(watchEditorUpdate)
          .provide([[GET_PHASE, phase]])
          .put(
            editPhase(step.key, {
              ...phase,
              steps: [],
            }),
          )
          .dispatch(removeStepFromPhase(phase.key, 'a'))
          .silentRun(0);
      });
    });

    describe('removeStepHandler', () => {
      it('should dispatch removeStep from phase and remove step', async () => {
        await expectSaga(watchEditorUpdate)
          // eslint-disable-next-line prettier/prettier
          .provide([
            [GET_STEP, step],
            [GET_PHASE, phase],
          ])
          .put(removeStepFromPhase(phase.key, step.key))
          .put(removeStep(step.key))
          .dispatch(requestRemoveStep(step.key))
          .silentRun(0);
      });
    });

    describe('createStepHandler', () => {
      it('should dispatch addStepToPhase if step has a phase', async () => {
        await expectSaga(watchEditorUpdate)
          // eslint-disable-next-line prettier/prettier
          .provide([
            [GET_STEP, step],
            [GET_PHASE, phase],
          ])
          .put(addStepToPhase(phase.key, step.key))
          .dispatch(createStep(step))
          .silentRun(0);
      });
    });
  });
});
