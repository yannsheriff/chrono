import { RootState } from '../store';
import { TrainingState } from './trainings.reducer';
import { Training } from '~/components/trainingList/trainingList';

export const getTrainingsState = (state: RootState): TrainingState =>
  state.trainingsReducer;

export const getTrainings = (state: RootState): Array<Training> =>
  getTrainingsState(state).trainings;
