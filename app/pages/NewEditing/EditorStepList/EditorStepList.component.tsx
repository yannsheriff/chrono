import React from 'react';

import EditableStep from '../EditableStep';
import { EditorStep, EditorPhase } from '~/redux/editor/editor.types';
import EditablePhase from '../EditablePhase';

interface Props {
  stepList: EditorStep[];
  phaseList: EditorPhase[];
}

const EditorStepList: React.FunctionComponent<Props> = ({
  stepList,
  phaseList,
}): JSX.Element => {
  const phaseLessSteps = stepList.filter(
    (step): boolean => step.phase === undefined,
  );
  const stepsPhaseArray: (EditorStep | EditorPhase)[] = [
    ...phaseLessSteps,
    ...phaseList,
  ];
  const components = stepsPhaseArray
    .sort(
      (a: EditorStep | EditorPhase, b: EditorStep | EditorPhase): number =>
        a.position - b.position,
    )
    .map(
      (element): JSX.Element => {
        return (element as EditorStep).duration ? (
          <EditableStep key={element.key} id={element.key} />
        ) : (
          <EditablePhase key={element.key} id={element.key} />
        );
      },
    );

  return <>{components}</>;
};

export default EditorStepList;
