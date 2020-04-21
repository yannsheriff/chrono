import {combineReducers} from 'redux';
import {screenReducer} from './screen/screen.reducer';
import {trainingsReducer} from './trainings/trainings.reducer';
import {pickerReducer} from './picker/picker.reducer';
import saga from './saga';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

const mainReducer = combineReducers({
  screenReducer,
  trainingsReducer,
  pickerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store;
