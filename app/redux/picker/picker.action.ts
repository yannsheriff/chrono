import { createAction } from 'typesafe-actions';

export const openPicker = createAction(
  'OPEN_PICKER',
  (id: string, value: number | false = false) => ({
    id,
    value,
  }),
)();

export const updatePickerValue = createAction(
  'UPDATE_VALUE',
  (value: number) => ({
    value,
  }),
)();

export const closePicker = createAction('CLOSE_PICKER')();
