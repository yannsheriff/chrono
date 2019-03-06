import React from 'react';
import { View, Button } from 'react-native';
import styles from './style';

export default function ChronoRemote(props) {
  const { isPaused, haveStarted } = props;

  const start = (
    <Button title="start" onPress={() => props.didPlayPause()} />
  );

  const remote = (
    <View style={styles.remoteContainer}>
      <Button
        style={styles.button}
        title="stop"
        onPress={() => props.didStop()}
      />
      <Button
        title={isPaused ? 'resume' : 'pause'}
        onPress={() => props.didPlayPause()}
      />
      <Button title="replay" onPress={() => props.didReplay()} />
    </View>
  );

  return (
    <View style={styles.container}>
      { haveStarted ? remote : start}
    </View>
  );
}
