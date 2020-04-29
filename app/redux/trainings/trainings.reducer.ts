import { createReducer, ActionType } from 'typesafe-actions';
import { Training } from '~/components/trainingList/trainingList.component';
import * as trainingActions from './trainings.actions';

export interface TrainingState {
  trainings: Training[];
}

const defaultState: TrainingState = {
  trainings: [],
};

export type TrainingActions = ActionType<typeof trainingActions>;

const trainingReducer = createReducer<TrainingState, TrainingActions>(
  defaultState,
)
  .handleAction(trainingActions.newTraining, (state, { payload }) => ({
    ...state,
    trainings: state.trainings.concat(payload.training),
  }))
  .handleAction(trainingActions.removeTraining, (state, { payload }) => ({
    ...state,
    trainings: state.trainings
      .slice(0, payload.trainingId)
      .concat(state.trainings.slice(payload.trainingId + 1)),
  }))
  .handleAction(trainingActions.updateTrainingById, (state, { payload }) => ({
    ...state,
    trainings: state.trainings.map(training => {
      if (training.id === payload.trainingId) return payload.training;
      return training;
    }),
  }))
  .handleAction(trainingActions.updateTraining, (state, { payload }) => ({
    ...state,
    trainings: state.trainings
      .slice(0, payload.trainingId)
      .concat(payload.training)
      .concat(state.trainings.slice(payload.trainingId + 1)),
  }));

export default trainingReducer;
