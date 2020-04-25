import { RootState } from '../store';
import { PickerState } from './picker.reducer';

export const getPicker = (state: RootState): PickerState => state.pickerReducer;

export const getPickerVisibility = (state: RootState): boolean =>
  getPicker(state).isVisible;

export const getPickerValue = (state: RootState): number =>
  getPicker(state).value;

export const getPickerStepId = (state: RootState): string =>
  getPicker(state).stepId;
