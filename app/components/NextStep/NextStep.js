import React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { icons } from '../../assets/img';

export default function ChronoRemote(props) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ff9f00', '#ffcb18']} style={styles.icon}>
        <Image source={icons.next} />
      </LinearGradient>

      <View>
        <Text style={styles.label}>Next step : </Text>
        <Text style={styles.text}>Pause - 20 s </Text>
      </View>
    </View>
  );
}
