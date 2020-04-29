import { getTrainings, getTrainingsState } from './trainings.selectors';
import { TrainingState } from './trainings.reducer';
import { RootState } from '../store';
import { Training } from '~/components/trainingList/trainingList';

describe(' serviceAccount', () => {
  describe('selectors', () => {
    const trainingsReducer: TrainingState = {
      trainings: [
        {
          name: 'test',
          difficulty: 'string',
          id: 'id',
          phases: [
            {
              name: 'coucou',
              repetitions: 1,
              position: 1,
              steps: [
                {
                  name: 'exo',
                  duration: 10,
                  key: 'string',
                },
              ],
            },
          ],
        },
      ],
    };

    // @ts-ignore
    const store: RootState = {
      trainingsReducer,
    };

    describe('getTrainingsState', () => {
      it('should return training state', () => {
        const serviceAccountStore: TrainingState = getTrainingsState(store);
        expect(serviceAccountStore).toEqual(trainingsReducer);
      });
    });
    describe('getEditorName', () => {
      it('should return training name', () => {
        const trainings: Training[] = getTrainings(store);
        expect(trainings).toEqual(trainingsReducer.trainings);
      });
    });
  });
});
