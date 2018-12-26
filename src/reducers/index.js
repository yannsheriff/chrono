import { combineReducers } from 'redux'
import { screenReducer }  from './screen'
import { trainingsReducer }  from './trainings'

const mainReducer = combineReducers({
    screenReducer,
    trainingsReducer
})

export default mainReducer