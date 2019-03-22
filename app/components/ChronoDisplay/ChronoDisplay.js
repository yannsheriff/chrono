import React from 'react';
import { View, Text } from 'react-native';
import Svg, {
  Rect,
  Path
} from 'react-native-svg';
import styles from './style';
import { chrono } from '../../helpers/humanize';
import ProgressBar from '../ProgressBar';

export default function ChronoRemote(props) {
  const name = props.stepName ? props.stepName.name : 'loading';

  const start = {
    x: 115 * Math.cos(0) + 135,
    y: 115 * Math.sin(0) + 135
  };
  return (
    <View style={styles.container}>
      <View style={styles.round}>
        <Text>{ name }</Text>
        <Text>
          {' '}
          {props.currentStepIndex}
          {' '}
          /
          {' '}
          {props.totalSteps}
        </Text>
        <Text>{props.currentTimer}</Text>
        <View style={styles.borderContainer}>
          <Svg
            height="270"
            width="270"
          >
            <Path
              // d="
              // M10 190 L24 110 L190 190
              // "
              d={`
              M ${start.x} ${start.y}
              A 100 100 0 1 1 232 220`}
              fill="none"
              stroke="yellow"
              strokeWidth="3"
            />
            <Rect
              x="135"
              y="135"
              width="10"
              height="10"
              fill="rgb(0,0,255)"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}
