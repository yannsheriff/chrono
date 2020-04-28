import React from 'react';
import { View, ScrollView, TextInput, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import styles from './Editing.style';
import DurationPicker from '~/components/DurationPicker';
import { Training } from '~/components/trainingList/trainingList';
import EditorStepList from './EditorStepList';

interface Props {
  updateTraining: (id: number, training: Training) => unknown;
  newTraining: (training: Training) => unknown;
  updateTrainingName: (name: string) => unknown;
  createStep: () => unknown;
  createPhase: () => unknown;
  saveTraining: () => unknown;
  trainingsList: Training[];
  navigation: NavigationStackProp;
  isPickerVisible: boolean;
  trainingName: string;
}

const NewEditing: React.FunctionComponent<Props> = ({
  updateTrainingName,
  isPickerVisible,
  trainingName,
  createStep,
  createPhase,
  saveTraining,
}): JSX.Element => (
  <View style={styles.container}>
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
      style={{ flexGrow: 2 }}
    >
      <TextInput
        value={trainingName}
        onChangeText={updateTrainingName}
        style={styles.name}
      />
      <EditorStepList />
      <Button title="step" onPress={createStep} />
      <Button title="phase" onPress={createPhase} />
    </ScrollView>
    <Button title="save" onPress={saveTraining} />
    {isPickerVisible && <DurationPicker />}
  </View>
);

export default NewEditing;
