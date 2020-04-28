import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { openPicker } from '~/redux/picker/picker.actions';
import EditableStep from './EditableStep.component';
import { RootState } from '~/redux/store';
import { getEditorStepById } from '~/redux/editor/editor.selectors';
import { editStepName, requestRemoveStep } from '~/redux/editor/editor.actions';

type EditorStepDispatchToProps = MapDispatchToPropsFunction<
  {
    removeStep: () => unknown;
    openPicker: (duration: number) => unknown;
    editStepName: (name: string) => unknown;
  },
  { id: string }
>;

const mapStateToProps = (state: RootState, ownProps: { id: string }) => ({
  ...getEditorStepById(state, ownProps.id),
});

const mapDispatchToProps: EditorStepDispatchToProps = (dispatch, { id }) => ({
  removeStep: (): unknown => dispatch(requestRemoveStep(id)),
  editStepName: (name: string): unknown => dispatch(editStepName(id, name)),
  openPicker: (duration: number): unknown => dispatch(openPicker(id, duration)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableStep);
