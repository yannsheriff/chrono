import generateID from '~/helpers/idGenerator';
import { Training } from '~/components/trainingList/trainingList.component';

export default function trainingFactory(
  training: Partial<Training> = {},
): Training {
  return {
    phases: [
      {
        repetitions: 1,
        name: 'phase',
        position: 0,
        steps: [
          {
            name: 'pompes',
            duration: 40,
            key: 'S_tesst',
          },
        ],
      },
      {
        repetitions: 2,
        name: 'phase',
        position: 2,
        steps: [
          {
            name: 'pas pompes',
            duration: 40,
            key: 'S_tessts',
          },
        ],
      },
    ],
    name: 'Nouvel entrainement',
    difficulty: 'Easy',
    id: `T${generateID()}`,
    ...training,
  };
}
