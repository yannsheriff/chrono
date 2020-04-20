/* eslint-disable import/prefer-default-export */

import trainings from '../training/index';

export function findTrainingID(training) {
  const promise = trainings();
  promise.then((trainings) => {
    let potentialTrainings = trainings.filter(el => el.name === training.name);
    potentialTrainings = potentialTrainings.filter(el => el.phases.length === training.phases.length);
  });
}
