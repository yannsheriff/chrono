import { OPEN_PICKER, UPDATE_VALUE, CLOSE_PICKER } from "./picker.action";

const defaultState = { isVisible: false, value: 0, stepId: 0 };

export function pickerReducer(state = defaultState, action) {
  switch (action.type) {
    case OPEN_PICKER:
      return {
        ...state,
        isVisible: true,
        stepId: action.id,
        value: action.value ? action.value : 0,
      };

    case CLOSE_PICKER:
      return {
        ...state,
        isVisible: false,
      };

    case UPDATE_VALUE:
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
}

export const test = "test";
