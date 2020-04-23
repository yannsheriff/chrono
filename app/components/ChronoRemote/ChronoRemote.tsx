import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../assets/img';
import styles from './style';

interface Props {
  isPaused: boolean;
  haveStarted: boolean;
  didPlayPause: () => unknown;
  didReplay: () => unknown;
  didStop: () => unknown;
}

const ChronoRemote: React.FunctionComponent<Props> = ({
  isPaused,
  haveStarted,
  didPlayPause,
  didReplay,
  didStop,
}) => {
  const start = (
    <TouchableOpacity
      style={[styles.bigButton, styles.shadow]}
      onPress={() => didPlayPause()}
    >
      <LinearGradient
        colors={['#ff9f00', '#ffcb18']}
        style={[styles.bigButton, styles.center]}
      >
        <Image source={icons.play} style={styles.img} resizeMode="contain" />
      </LinearGradient>
    </TouchableOpacity>
  );
  const pause = (
    <TouchableOpacity
      style={[styles.bigButton, styles.shadow]}
      onPress={() => didPlayPause()}
    >
      <LinearGradient
        colors={['#1b2226', '#39464e']}
        style={[styles.bigButton, styles.center]}
      >
        <Image source={icons.pause} style={styles.img} resizeMode="contain" />
      </LinearGradient>
    </TouchableOpacity>
  );

  const remote = (
    <View style={styles.remoteContainer}>
      <TouchableOpacity
        style={[styles.smallButton, styles.shadow]}
        onPress={() => didReplay()}
      >
        <LinearGradient
          colors={['#1b2226', '#39464e']}
          style={[styles.smallButton, styles.center]}
        >
          <Image
            source={icons.replay}
            style={styles.img}
            resizeMode="contain"
          />
        </LinearGradient>
      </TouchableOpacity>
      {isPaused ? start : pause}
      <TouchableOpacity
        style={[styles.smallButton, styles.shadow]}
        onPress={() => didStop()}
      >
        <LinearGradient
          colors={['#1b2226', '#39464e']}
          style={[styles.smallButton, styles.center]}
        >
          <Image
            source={icons.stop}
            style={{ width: 19, height: 19 }}
            resizeMode="contain"
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return <View style={styles.container}>{haveStarted ? remote : start}</View>;
};

export default ChronoRemote;
