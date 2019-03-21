
import React from 'react';
import {
  View,
} from 'react-native';
import styles from './style';

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.progressBar, width: `${props.progress}%` }} />
    </View>
  );
}
