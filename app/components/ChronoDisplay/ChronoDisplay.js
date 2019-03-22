import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { chrono } from '../../helpers/humanize';
import ProgressBar from '../ProgressBar';

export default function ChronoRemote(props) {
  const name = props.stepName ? props.stepName.name : 'loading';
  return (
    <View style={styles.container}>
      <View style={styles.round}>
        <Text>{ name }</Text>
        <Text>
          {' '}
          {props.currentStepIndex}
          {' '}
          /
          {' '}
          {props.totalSteps}
        </Text>
        <Text>{props.currentTimer}</Text>
      </View>
    </View>
  );
}
