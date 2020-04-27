import React from 'react';

import EditableStep from '../EditableStep';
import { EditorStep, EditorPhase } from '~/redux/editor/editor.types';
import EditablePhase from '../EditablePhase';

interface Props {
  stepList: Array<EditorStep>;
  phaseList: Array<EditorPhase>;
}

const EditorStepList: React.FunctionComponent<Props> = ({
  stepList,
  phaseList,
}) => {
  const phaseLessSteps = stepList.filter(step => step.phase === undefined);
  const stepsPhaseArray: Array<EditorStep | EditorPhase> = [
    ...phaseLessSteps,
    ...phaseList,
  ];
  const components = stepsPhaseArray
    .sort(
      (a: EditorStep | EditorPhase, b: EditorStep | EditorPhase) =>
        a.position - b.position,
    )
    .map(element => {
      return (element as EditorStep).duration ? (
        <EditableStep key={element.key} id={element.key} />
      ) : (
        <EditablePhase key={element.key} id={element.key} />
      );
    });

  return <>{components}</>;
};

export default EditorStepList;
