import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './EditablePhase.style';
import { EditorStep } from '~/redux/editor/editor.types';
import EditableStep from '../EditableStep';

export interface EditablePhaseProps {
  steps: EditorStep[];
  repetitions: number;
  addRepetitions: () => unknown;
  newStep: () => unknown;
  removeRepetitions: () => unknown;
}

const EditablePhase: React.FunctionComponent<EditablePhaseProps> = ({
  removeRepetitions,
  addRepetitions,
  repetitions,
  newStep,
  steps,
}): JSX.Element => {
  const stepsComponents = steps.map(
    (step: EditorStep): JSX.Element => (
      <EditableStep key={step.key} id={step.key} />
    ),
  );

  return (
    <View style={styles.phase}>
      <View style={styles.phaseHeader}>
        <Text>Répétiton</Text>
        <View style={styles.repetitions}>
          <Button title="-" onPress={removeRepetitions} />
          <Text> x{repetitions} </Text>
          <Button title="+" onPress={addRepetitions} />
        </View>
      </View>
      <View>
        {stepsComponents}
        <Button title="+" onPress={newStep} />
      </View>
    </View>
  );
};

export default EditablePhase;
