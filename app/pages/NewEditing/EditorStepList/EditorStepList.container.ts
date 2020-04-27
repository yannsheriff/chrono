import { connect } from 'react-redux';
import EditorStepList from './EditorStepList.component';
import { RootState } from '~/redux/store';
import {
  getEditorSteps,
  getEditorPhases,
} from '~/redux/editor/editor.selectors';

const mapStateToProps = (state: RootState) => {
  return {
    stepList: getEditorSteps(state),
    phaseList: getEditorPhases(state),
  };
};

export default connect(mapStateToProps)(EditorStepList);
