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

export const hydrateStore = createAction('POPULATE_STORE', (value: any) => ({
  value,
}))();
