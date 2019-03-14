import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { chrono } from '../../helpers/humanize';

export default function ChronoRemote(props) {
  return (
    <View style={styles.container}>
      <Text>
        {props.name}
        {' '}
      </Text>
      <Text>
        {chrono(props.doneTime)}
        {' '}
/
        {' '}
        {chrono(props.totalTime)}
      </Text>
    </View>
  );
}
