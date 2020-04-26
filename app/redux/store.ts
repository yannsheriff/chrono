import { combineReducers } from 'redux';
import trainingsReducer from './trainings/trainings.reducer';
import pickerReducer from './picker/picker.reducer';
import editorReducer from './editor/editor.reducer';
import saga from './saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const createCombinedReducers = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['trainingsReducer'],
  };

  const rootReducer = combineReducers({
    trainingsReducer,
    pickerReducer,
    editorReducer,
  });

  return persistReducer(persistConfig, rootReducer);
};

export type RootState = ReturnType<ReturnType<typeof createCombinedReducers>>;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createCombinedReducers(),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const persistor = persistStore(store);

export default { store, persistor };
sagaMiddleware.run(saga);
