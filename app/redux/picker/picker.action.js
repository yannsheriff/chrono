export const OPEN_PICKER = 'OPEN_PICKER';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const CLOSE_PICKER = 'CLOSE_PICKER';

export function openPicker(id, value = false) {
  return {
    type: OPEN_PICKER,
    value: value || false,
    id,
  };
}

export function updatePickerValue(value) {
  return {
    type: UPDATE_VALUE,
    value,
  };
}

export function closePicker() {
  return {
    type: CLOSE_PICKER,
  };
}
