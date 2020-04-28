import { connect } from 'react-redux';
import EditorStepList from './EditorStepList.component';
import { RootState } from '~/redux/store';
import {
  getEditorSteps,
  getEditorPhases,
} from '~/redux/editor/editor.selectors';
import { EditorStep, EditorPhase } from '~/redux/editor/editor.types';

const mapStateToProps = (
  state: RootState,
): {
  stepList: EditorStep[];
  phaseList: EditorPhase[];
} => {
  return {
    stepList: getEditorSteps(state),
    phaseList: getEditorPhases(state),
  };
};

export default connect(mapStateToProps)(EditorStepList);
