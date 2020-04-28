import generateID from '~/helpers/idGenerator';

export const steps = {
  duration: 15,
  key: 's-1547155199',
  name: 'planches',
};
export const phases = {
  name: 'phase 1',
  repetitions: 1,
  steps,
};
export const training = {
  name: 'training',
  difficulty: 'easy',
  id: generateID,
  phases,
};

export default [training, phases, steps];
