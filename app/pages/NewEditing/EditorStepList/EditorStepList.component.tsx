import React from 'react';

import EditableStep from '../EditableStep';
import { EditorStep, EditorPhase } from '~/redux/editor/editor.reducer';

interface Props {
  stepList: Array<EditorStep>;
  phaseList: Array<EditorPhase>;
}

const EditorStepList: React.FunctionComponent<Props> = ({
  stepList,
  phaseList,
}) => {
  const stepsComponents = stepList
    .sort((a: EditorStep, b: EditorStep) => a.position - b.position)
    .map(step => {
      return <EditableStep key={step.key} id={step.key} />;
    });

  return (
    <>
      {/* <Text>Cououc</Text> */}
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      {stepsComponents}
      {/* </ScrollView> */}
    </>
  );
};

export default EditorStepList;
