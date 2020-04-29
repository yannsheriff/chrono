import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import trainingsReducer from './trainings/trainings.reducer';
import pickerReducer from './picker/picker.reducer';
import editorReducer from './editor/editor.reducer';
import saga from './saga';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

export type RootState = ReturnType<
  ReturnType<typeof createCombinedReducers>
>;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createCombinedReducers(),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const persistor = persistStore(store);

export default { store, persistor };
sagaMiddleware.run(saga);
