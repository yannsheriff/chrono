import {
    NEW_TRAINING,
    REMOVE_TRAINING,
    UPDATE_TRAINING,
} from '../actions/trainingsActions'
import { POPULATE_STORE } from '../actions/loading'
import { Map } from 'immutable';
const defaultState = { 
    trainings: []
}


export function trainingsReducer(state = defaultState, action) {
    
    switch (action.type) {
        case NEW_TRAINING:
        var concatTrainings = state.trainings.concat(action.payload)
            var newState = {
                ...state,
                trainings: concatTrainings,
            }
            return newState
        case UPDATE_TRAINING:
        return  {
            ...state,
            trainings: state.trainings.slice(0, action.payload.trainingId).concat(action.payload.training).concat( state.trainings.slice(action.payload.trainingId + 1)),
        }
            
        case REMOVE_TRAINING:
            return {
                ...state,
                trainings: state.trainings.slice(0,action.payload.trainingId).concat(state.trainings.slice(action.payload.trainingId+1)),
            }
        
        case POPULATE_STORE:
            return {
                trainings: action.payload,
            }
        default:
            return state
    }
        
    


}
