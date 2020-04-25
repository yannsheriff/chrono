import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { chrono } from '~/helpers/humanize';
import ProgressBar from '../ProgressBar';

interface Props {
  name: string;
  doneTime: number;
  totalTime: number;
}

const ChronoRemote: React.FunctionComponent<Props> = ({
  name,
  doneTime,
  totalTime,
}) => {
  console.log('totalTime', totalTime);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name} </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.doneTime}>{chrono(doneTime)} </Text>
          <Text style={styles.time}>/ {chrono(totalTime)}</Text>
        </View>
        <ProgressBar progress={doneTime * (100 / totalTime)} />
      </View>
    </View>
  );
};

export default ChronoRemote;
