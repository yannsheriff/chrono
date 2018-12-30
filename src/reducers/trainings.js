import {
    NEW_TRAINING,
    REMOVE_TRAINING,
    UPDATE_TRAINING,
} from '../actions/trainingsActions'
import { Map } from 'immutable';
const defaultState = { 
    trainings: [
        {
            name : 'training',
            phases : [
                {
                    name : 'phase 1',
                    repetitions : 1,
                    steps : [
                        {
                            name : 'planche',
                            duration : 7, 
                            key: 's-6789'
                        },
                        {
                            name : 'pause',
                            duration : 5,
                            key: 's-6788'
                        },
                        {
                            name : 'planche',
                            duration : 10,
                            key: 's-6787'
                        },
                    ]
                }
            ]
        }
    ]
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
                trainings: state.trainings.slice(0,action.payload.trainingId).concat(state.trainings.slice(action.payload.trainingId+1)),
                ...state,
            }
        default:
            return state
    }
        
    


}
