import generateID from '~/helpers/idGenerator';
import { Training } from '~/components/trainingList/trainingList';

export default function trainingFactory(
  training: Partial<Training> = {},
): Training {
  return {
    phases: [],
    name: 'Nouvel entrainement',
    difficulty: 'Easy',
    id: `T${generateID()}`,
    ...training,
  };
}
