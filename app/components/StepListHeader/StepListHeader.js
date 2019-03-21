import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { chrono } from '../../helpers/humanize';
import ProgressBar from '../ProgressBar';

export default function ChronoRemote(props) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>

        <Text style={styles.name}>
          {props.name}
          {' '}
        </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.doneTime}>
            {chrono(props.doneTime)}
            {' '}
          </Text>
          <Text style={styles.time}>
/
            {' '}
            {chrono(props.totalTime)}
          </Text>
        </View>
        <ProgressBar progress={props.doneTime * (100 / props.totalTime)} />
      </View>
    </View>
  );
}
