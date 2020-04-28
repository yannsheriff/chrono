import { createReducer, ActionType } from 'typesafe-actions';
import * as pickerActions from './picker.actions';

export type PickerActions = ActionType<typeof pickerActions>;
const defaultState: PickerState = { isVisible: false, value: 0, stepId: '0' };

export interface PickerState {
  isVisible: boolean;
  value: number;
  stepId: string;
}

const pickerReducer = createReducer<PickerState, PickerActions>(defaultState)
  .handleAction(pickerActions.openPicker, (state, { payload }) => ({
    ...state,
    isVisible: true,
    stepId: payload.id,
    value: payload.value ? payload.value : 0,
  }))
  .handleAction(pickerActions.closePicker, state => ({
    ...state,
    isVisible: false,
  }))
  .handleAction(pickerActions.updatePickerValue, (state, { payload }) => ({
    ...state,
    value: payload.value,
  }));

export default pickerReducer;
