import { POPULATE_STORE } from '../loading/loading.action';
import { Training } from '~/components/trainingList/trainingList';

import { createReducer, ActionType } from 'typesafe-actions';
import * as trainingActions from './trainings.action';

export interface TrainingState {
  trainings: Array<Training>;
}

const defaultState: TrainingState = {
  trainings: [],
};

// export function trainingsReducer(state = defaultState, action): TrainingState {
//   switch (action.type) {
//     case NEW_TRAINING:
//       var concatTrainings = state.trainings.concat(action.payload);
//       var newState = {
//         ...state,
//         trainings: concatTrainings,
//       };
//       return newState;
//     case UPDATE_TRAINING:
//       return {
//         ...state,
//         trainings: state.trainings
//           .slice(0, action.payload.trainingId)
//           .concat(action.payload.training)
//           .concat(state.trainings.slice(action.payload.trainingId + 1)),
//       };

//     case REMOVE_TRAINING:
//       return {
//         ...state,
//         trainings: state.trainings
//           .slice(0, action.payload.trainingId)
//           .concat(state.trainings.slice(action.payload.trainingId + 1)),
//       };

//     case POPULATE_STORE:
//       return {
//         trainings: action.payload,
//       };
//     default:
//       return state;
//   }
// }

export type TrainingActions = ActionType<typeof trainingActions>;

export interface PickerState {
  isVisible: boolean;
  value: number;
  stepId: string;
}

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
