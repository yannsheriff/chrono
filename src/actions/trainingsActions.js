export const NEW_TRAINING = 'NEW_TRAINING'
export const REMOVE_TRAINING = 'REMOVE_TRAINING'


export function newTraining(training) {
    return {
        type: NEW_TRAINING,
        payload: training 
    }
}
export function removeTraining(trainingId) {
    return {
        type: REMOVE_TRAINING,
        payload: { 
            trainingId: trainingId,
        }
    }
}

