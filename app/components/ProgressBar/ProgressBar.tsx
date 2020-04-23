import React from 'react';
import { View } from 'react-native';
import styles from './style';

interface Props {
  progress: number;
}

const ProgressBar: React.FunctionComponent<Props> = ({ progress }) => (
  <View style={styles.container}>
    <View style={{ ...styles.progressBar, width: `${progress}%` }} />
  </View>
);

export default ProgressBar;
