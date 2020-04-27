import React from 'react';
import { View, ScrollView, TextInput, Button } from 'react-native';
import generateID from '~/helpers/idGenerator';
import styles from './Editing.style';
import DurationPicker from '~/components/DurationPicker';
import { Training } from '~/components/trainingList/trainingList';
import { NavigationStackProp } from 'react-navigation-stack';
import EditorStepList from './EditorStepList';
import { EditorStep } from '~/redux/editor/editor.types';

type Props = {
  updateTraining: (id: number, training: Training) => unknown;
  newTraining: (training: Training) => unknown;
  updateTrainingName: (name: string) => unknown;
  createStep: () => unknown;
  createPhase: () => unknown;
  trainingsList: Array<Training>;
  navigation: NavigationStackProp;
  isPickerVisible: boolean;
  trainingName: string;
};

const NewEditing: React.FunctionComponent<Props> = ({
  updateTrainingName,
  isPickerVisible,
  trainingName,
  createStep,
  createPhase,
}) => (
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

    {isPickerVisible && <DurationPicker />}
  </View>
);

export default NewEditing;
