import { all } from 'redux-saga/effects';
import { Saga } from 'redux-saga';

import { watchTrainingUpdate } from './trainings/trainings.saga';
import { watchEditorUpdate } from './editor/editor.saga';
import { watchPickerUpdate } from './picker/picker.saga';

// Notice how we now only export the rootSaga,
// single entry point to start all Sagas at once
export default function* rootSaga(): Saga {
  yield all([watchTrainingUpdate(), watchEditorUpdate(), watchPickerUpdate()]);
}
