import trainings from '../training/index';

export function findTrainingID(training) {
  const promise = trainings();
  promise.then(recievedTrainings => {
    let potentialTrainings = recievedTrainings.filter(
      el => el.name === training.name,
    );
    potentialTrainings = potentialTrainings.filter(
      el => el.phases.length === training.phases.length,
    );
  });
}
