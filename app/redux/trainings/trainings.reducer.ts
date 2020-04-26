import { Training } from '~/components/trainingList/trainingList';

import { createReducer, ActionType } from 'typesafe-actions';
import * as trainingActions from './trainings.action';

export interface TrainingState {
  trainings: Array<Training>;
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
  .handleAction(trainingActions.updateTraining, (state, { payload }) => ({
    ...state,
    trainings: state.trainings
      .slice(0, payload.trainingId)
      .concat(payload.training)
      .concat(state.trainings.slice(payload.trainingId + 1)),
  }))
  .handleAction(trainingActions.hydrateStore, (state, { payload }) => ({
    ...state,
    trainings: payload.value,
  }));

export default trainingReducer;
