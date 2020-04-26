import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';

import DurationPicker from '~/components/DurationPicker';
import { Training } from '~/components/trainingList/trainingList';
import { NavigationStackProp } from 'react-navigation-stack';
import EditorStepList from './EditorStepList';

type Props = {
  updateTraining: (id: number, training: Training) => unknown;
  newTraining: (training: Training) => unknown;
  updateTrainingName: (name: string) => unknown;
  trainingsList: Array<Training>;
  navigation: NavigationStackProp;
  isPickerVisible: boolean;
  pickerValue: number;
  trainingName: string;
};

const NewEditing: React.FunctionComponent<Props> = ({
  updateTrainingName,
  isPickerVisible,
  pickerValue,
  trainingName,
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
        {/* <Button title="+" onPress={this.newPhase} /> */}
      </ScrollView>

      {isPickerVisible && (
        <DurationPicker value={pickerValue ? pickerValue : 0} />
      )}
    </View>
  );
};

export default NewEditing;
