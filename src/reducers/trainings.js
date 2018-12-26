import {
    NEW_TRAINING,
    REMOVE_TRAINING,
} from '../actions/trainingsActions'
import { Map } from 'immutable';
const defaultState = { 
    trainings: [
        {
            name : 'zizi',
            phases : [
                {
                    name : 'phase 1',
                    repetitions : 1,
                    steps : [
                        {
                            name : 'planche',
                            duration : 7
                        },
                        {
                            name : 'pause',
                            duration : 5
                        },
                        {
                            name : 'planche',
                            duration : 10
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
            return {
                trainings: [
                    action.payload,
                    ...state.trainings,
                ],
                ...state,
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
