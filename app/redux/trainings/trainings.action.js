export const NEW_TRAINING = 'NEW_TRAINING';
export const REMOVE_TRAINING = 'REMOVE_TRAINING';
export const UPDATE_TRAINING = 'UPDATE_TRAINING';
export const HYDRATE_STORE = 'HYDRATE_STORE';


export function newTraining(training) {
  return {
    type: NEW_TRAINING,
    payload: training
  };
}
export function removeTraining(trainingId) {
  return {
    type: REMOVE_TRAINING,
    payload: {
      trainingId,
    }
  };
}
export function updateTraining(trainingId, training) {
  return {
    type: UPDATE_TRAINING,
    payload: {
      trainingId,
      training
    }
  };
}
export function hydrateStore(payload) {
  return {
    type: HYDRATE_STORE,
    payload
  };
}
