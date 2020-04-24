import {
  NEW_TRAINING,
  REMOVE_TRAINING,
  UPDATE_TRAINING,
} from './trainings.action';
import { POPULATE_STORE } from '../loading/loading.action';
import { Training } from '../../components/trainingList/trainingList';

export interface TrainingState {
  trainings: Array<Training>;
}

const defaultState: TrainingState = {
  trainings: [],
};

export function trainingsReducer(state = defaultState, action): TrainingState {
  switch (action.type) {
    case NEW_TRAINING:
      var concatTrainings = state.trainings.concat(action.payload);
      var newState = {
        ...state,
        trainings: concatTrainings,
      };
      return newState;
    case UPDATE_TRAINING:
      return {
        ...state,
        trainings: state.trainings
          .slice(0, action.payload.trainingId)
          .concat(action.payload.training)
          .concat(state.trainings.slice(action.payload.trainingId + 1)),
      };

    case REMOVE_TRAINING:
      return {
        ...state,
        trainings: state.trainings
          .slice(0, action.payload.trainingId)
          .concat(state.trainings.slice(action.payload.trainingId + 1)),
      };

    case POPULATE_STORE:
      return {
        trainings: action.payload,
      };
    default:
      return state;
  }
}

export const test = 'test';
