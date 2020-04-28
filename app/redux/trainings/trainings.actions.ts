import { createAction } from 'typesafe-actions';
import { Training } from '~/components/trainingList/trainingList';

export const newTraining = createAction(
  'NEW_TRAINING',
  (training: Training) => ({
    training,
  }),
)();

export const removeTraining = createAction(
  'REMOVE_TRAINING',
  (trainingId: number) => ({
    trainingId,
  }),
)();

export const updateTraining = createAction(
  'UPDATE_TRAINING',
  (trainingId: number, training: Training) => ({
    trainingId,
    training,
  }),
)();

export const updateTrainingById = createAction(
  'UPDATE_TRAINING_BY_ID',
  (trainingId: string, training: Training) => ({
    trainingId,
    training,
  }),
)();

export const requestSaveTraining = createAction('REQUEST_SAVE_TRAINING')();
