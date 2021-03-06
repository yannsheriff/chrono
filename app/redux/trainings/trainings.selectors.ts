import { RootState } from '../store';
import { TrainingState } from './trainings.reducer';
import { Training } from '~/components/trainingList/trainingList.component';

export const getTrainingsState = (state: RootState): TrainingState =>
  state.trainingsReducer;

export const getTrainings = (state: RootState): Training[] =>
  getTrainingsState(state).trainings;
