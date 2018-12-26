import { OPEN_PICKER, UPDATE_VALUE } from '../actions/pickerActions'

export function pickerReducer(state = { isVisible: false, value: 0 }, action) {
    switch (action.type) {
        case OPEN_PICKER:
            console.log('all good here', action)
            return {
                ...state,
                isVisible: true,
                value: action.value ? action.value :  0
            }

        case UPDATE_VALUE: 
            return {
                ...state,
                value: action.value 
            }

        
        default:
            return state
    }
}
