import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './style';


export default function trainingList(props) {
  const { trainings } = props;
  const trainingsComps = trainings.map((el, index) => (
    <TouchableOpacity
      style={styles.training}
      onPress={() => props.navigation.navigate('EditTraining', { trainingIndex: index })}
      onLongPress={() => Alert.alert('Are you sure ?', 'Do you really want to delete this training ?', [
        {
          text: 'yes',
          onPress: () => {
            props.onTrainingDeletionRequest(index);
          },
          style: 'destructive'
        },
        {
          text: 'cancel',
          style: 'cancel'
        }
      ])}
    >
      <Text>
        {' '}
        { el.name }
        {' '}
      </Text>
    </TouchableOpacity>
  ));


  return (
    <View style={styles.container}>
      { trainingsComps }
    </View>
  );
}
