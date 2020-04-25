import React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { icons } from '~/assets/img';
import { Step } from '../EditableStep/EditableStep.component';

interface Props {
  step?: Step;
}

const ChronoRemote: React.FunctionComponent<Props> = ({ step }) => {
  const name = step ? step.name : 'loading';
  const time = step ? step.duration : '--';
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <LinearGradient colors={['#ff9f00', '#ffcb18']} style={styles.icon}>
          <Image source={icons.next} style={styles.next} />
        </LinearGradient>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Next step : </Text>
          <Text style={styles.text}>
            {name} - {time} s{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChronoRemote;
