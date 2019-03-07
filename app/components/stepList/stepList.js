
import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import styles from './style';
import Step from '../step';


export default function stepList(props) {
  const steps = props.steps.map((el, index) => {
    const progress = index === props.currentStep ? props.currentStepProgress : 0;
    const displayStep = index >= props.currentStep;
    if (displayStep) {
      return (
        <Step
          name={el.name}
          duration={el.duration}
          progress={progress}
        />
      );
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      { steps }
    </ScrollView>
  );
}
