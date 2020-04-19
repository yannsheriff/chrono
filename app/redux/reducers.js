import { combineReducers } from "redux";
import { screenReducer } from "./screen/screen.reducer";
import { trainingsReducer } from "./trainings/trainings.reducer";
import { pickerReducer } from "./picker/picker.reducer";

const mainReducer = combineReducers({
  screenReducer,
  trainingsReducer,
  pickerReducer,
});

export default mainReducer;
