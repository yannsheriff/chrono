import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styles from './style';
import EditableStep from '../step';
import { Step } from '../EditableStep/EditableStep.component';

interface Props {
  steps: Array<Step>;
  currentStepIndex?: number;
  currentStepProgress: number;
}

const stepList: React.FunctionComponent<Props> = ({
  steps,
  currentStepIndex = 0,
  currentStepProgress,
}) => {
  const stepsComponents = steps.map((step, index) => {
    const progress = index === currentStepIndex ? currentStepProgress : 0;
    const displayStep = index >= currentStepIndex;
    if (displayStep) {
      return (
        <EditableStep
          name={step.name}
          duration={step.duration}
          progress={progress}
        />
      );
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {stepsComponents}
    </ScrollView>
  );
};

export default stepList;
