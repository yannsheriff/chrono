import React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { icons } from '../../assets/img';

export default function ChronoRemote(props) {
  const name = props.step ? props.step.name : 'loading';
  const time = props.step ? props.step.duration : '--';
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <LinearGradient colors={['#ff9f00', '#ffcb18']} style={styles.icon}>
          <Image source={icons.next} style={styles.next} useAngle angle={229} />
        </LinearGradient>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Next step : </Text>
          <Text style={styles.text}>
            {name}
            {' '}
            -
            {' '}
            {time}
            {' '}
            s
            {' '}
          </Text>
        </View>
      </View>
    </View>
  );
}
