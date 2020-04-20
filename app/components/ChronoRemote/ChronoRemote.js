import React from 'react';
import {
  View, TouchableOpacity, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../assets/img';
import styles from './style';

export default function ChronoRemote(props) {
  const { isPaused, haveStarted } = props;

  const start = (
    <TouchableOpacity style={[styles.bigButton, styles.shadow]} onPress={() => props.didPlayPause()}>
      <LinearGradient colors={['#ff9f00', '#ffcb18']} style={[styles.bigButton, styles.center]}>
        <Image source={icons.play} style={styles.img} resizeMode="contain" />
      </LinearGradient>
    </TouchableOpacity>
  );
  const pause = (
    <TouchableOpacity style={[styles.bigButton, styles.shadow]} onPress={() => props.didPlayPause()}>
      <LinearGradient colors={['#1b2226', '#39464e']} style={[styles.bigButton, styles.center]}>
        <Image source={icons.pause} style={styles.img} resizeMode="contain" />
      </LinearGradient>
    </TouchableOpacity>
  );

  const remote = (
    <View style={styles.remoteContainer}>
      <TouchableOpacity style={[styles.smallButton, styles.shadow]} onPress={() => props.didReplay()}>
        <LinearGradient colors={['#1b2226', '#39464e']} style={[styles.smallButton, styles.center]}>
          <Image source={icons.replay} style={styles.img} resizeMode="contain" />
        </LinearGradient>
      </TouchableOpacity>
      { isPaused ? start : pause}
      <TouchableOpacity style={[styles.smallButton, styles.shadow]} onPress={() => props.didStop()}>
        <LinearGradient colors={['#1b2226', '#39464e']} style={[styles.smallButton, styles.center]}>
          <Image source={icons.stop} style={{ width: 19, height: 19 }} resizeMode="contain" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      { haveStarted ? remote : start}
    </View>
  );
}
