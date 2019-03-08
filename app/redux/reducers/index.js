import { combineReducers } from 'redux';
import { screenReducer } from './screen';
import { trainingsReducer } from './trainings';
import { pickerReducer } from './picker';

const mainReducer = combineReducers({
  screenReducer,
  trainingsReducer,
  pickerReducer
});

export default mainReducer;
