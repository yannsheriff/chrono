import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './EditableStep.style';

export type Step = {
  name: string;
  duration: number;
  key: string;
};

export interface EditableStepProps {
  name: string;
  duration: number;
  key: string;
  openPicker: (duration: number) => unknown;
  removeStep: () => unknown;
  editStepName: (name: string) => unknown;
}

const EditableStep: React.FunctionComponent<EditableStepProps> = ({
  name,
  duration,
  openPicker,
  removeStep,
  editStepName,
}) => {
  return (
    <TouchableOpacity style={styles.step} onLongPress={removeStep}>
      <View style={styles.titleContainer}>
        <TextInput
          style={{
            height: 40,
            borderWidth: 0,
            marginLeft: 15,
          }}
          onChangeText={editStepName}
          placeholder={'name'}
          value={name}
        />
      </View>
      <View style={styles.timerContainer}>
        <TouchableOpacity onPress={() => openPicker(duration)}>
          <Text> {duration ? duration : 'choose duration'} </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default EditableStep;
