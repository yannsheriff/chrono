export const OPEN_PICKER = 'OPEN_PICKER'
export const UPDATE_VALUE = 'UPDATE_VALUE'

export function openPicker(value) {
    return {
        type: OPEN_PICKER,
        value: value ? value : false
    }
}

export function updatePickerValue(value) {
    return {
        type: UPDATE_VALUE,
        value: value 
    }
}
