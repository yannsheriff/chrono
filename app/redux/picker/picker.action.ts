import { createAction } from 'typesafe-actions';

// export function openPicker(id: string, value = false) {
//   return {
//     type: OPEN_PICKER,
//     value: value || false,
//     id,
//   };
// }

// export function updatePickerValue(value: number) {
//   return {
//     type: UPDATE_VALUE,
//     value,
//   };
// }

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
