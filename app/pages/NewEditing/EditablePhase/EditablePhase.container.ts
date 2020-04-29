import { connect, MapDispatchToPropsFunction } from 'react-redux';
import generateID from '~/helpers/idGenerator';
import EditableStep from './EditablePhase.component';
import { RootState } from '~/redux/store';
import {
  getEditorPhaseStepsById,
  getEditorPhaseRepetitionsById,
} from '~/redux/editor/editor.selectors';
import {
  editPhaseRepetitions,
  requestCreateStep,
} from '~/redux/editor/editor.actions';
import { EditorStep } from '~/redux/editor/editor.types';

type EditorStepDispatchToProps = MapDispatchToPropsFunction<
  {
    addRepetitions: () => unknown;
    newStep: () => unknown;
    removeRepetitions: () => unknown;
  },
  { id: string }
>;

const mapStateToProps = (
  state: RootState,
  ownProps: { id: string },
): {
  steps: EditorStep[];
  repetitions: number;
} => ({
  steps: getEditorPhaseStepsById(state, ownProps.id),
  repetitions: getEditorPhaseRepetitionsById(state, ownProps.id),
});

const mapDispatchToProps: EditorStepDispatchToProps = (
  dispatch,
  { id },
): {
  addRepetitions: () => unknown;
  newStep: () => unknown;
  removeRepetitions: () => unknown;
} => ({
  addRepetitions: (): unknown => dispatch(editPhaseRepetitions(id, true)),
  removeRepetitions: (): unknown => dispatch(editPhaseRepetitions(id, false)),
  newStep: (): unknown =>
    dispatch(
      requestCreateStep({
        phase: id,
        name: 'exercice',
        key: `S${generateID()}`,
        duration: 10,
        position: 1,
      }),
    ),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(EditableStep);
