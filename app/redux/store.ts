import { combineReducers } from 'redux';
import { trainingsReducer } from './trainings/trainings.reducer';
import pickerReducer from './picker/picker.reducer';
import saga from './saga';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const mainReducer = combineReducers({
  trainingsReducer,
  pickerReducer,
});

export type RootState = ReturnType<typeof mainReducer>;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store;
