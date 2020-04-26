import React from 'react';
import { View, ScrollView, TextInput, Button } from 'react-native';
import generateID from '~/helpers/idGenerator';

import DurationPicker from '~/components/DurationPicker';
import { Training } from '~/components/trainingList/trainingList';
import { NavigationStackProp } from 'react-navigation-stack';
import EditorStepList from './EditorStepList';
import { EditorStep } from '~/redux/editor/editor.reducer';

type Props = {
  updateTraining: (id: number, training: Training) => unknown;
  newTraining: (training: Training) => unknown;
  updateTrainingName: (name: string) => unknown;
  createStep: (step: EditorStep) => unknown;
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
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{ flexGrow: 2 }}
      >
        <TextInput
          value={trainingName}
          onChangeText={updateTrainingName}
          style={{
            fontSize: 40,
            marginVertical: 20,
            fontWeight: 'bold',
            borderWidth: 0,
            alignSelf: 'flex-start',
            paddingLeft: 20,
          }}
        />
        <EditorStepList />
        <Button
          title="+"
          onPress={() =>
            createStep({
              key: `S${generateID()}`,
              name: 'exercice',
              duration: 5,
              position: 0,
            })
          }
        />
      </ScrollView>

      {isPickerVisible && <DurationPicker />}
    </View>
  );
};

export default NewEditing;
