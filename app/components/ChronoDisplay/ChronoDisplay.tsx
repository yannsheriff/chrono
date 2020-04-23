import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { chrono } from '../../helpers/humanize';

interface Props {
  currentStepProgress: number;
  currentStepIndex: number;
  totalSteps: number;
  currentTimer: number;
  stepName: {
    name: number;
  };
  width: number;
}

export default function ChronoRemote({
  stepName,
  currentStepIndex,
  totalSteps,
  currentStepProgress,
  currentTimer,
  width,
}: Props) {
  const name = stepName ? stepName.name : 'loading';
  const actualWidth = width ? width : 280;
  const spaceBetweenCicrcles = 60;
  const radius = width / 2 - 10;
  const start = {
    x: radius * Math.cos(135 * (Math.PI / 180)) + width / 2,
    y: radius * Math.sin(135 * (Math.PI / 180)) + width / 2,
  };
  const end = {
    x: radius * Math.cos(45 * (Math.PI / 180)) + width / 2,
    y: radius * Math.sin(45 * (Math.PI / 180)) + width / 2,
  };

  const progress = calcPos(currentStepProgress, actualWidth, radius);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.round,
          width: actualWidth - spaceBetweenCicrcles,
          height: actualWidth - spaceBetweenCicrcles,
        }}
      >
        <LinearGradient
          colors={['#39464e', '#1b2226']}
          style={{
            ...styles.round,
            width: actualWidth - spaceBetweenCicrcles,
            height: actualWidth - spaceBetweenCicrcles,
          }}
        >
          <Text style={styles.steps}>
            {currentStepIndex + 1}/{totalSteps}
          </Text>
          <Text style={styles.timer}>{chrono(currentTimer)}</Text>
          <Text style={styles.name}>{name}</Text>
        </LinearGradient>
      </View>

      <View
        style={{
          ...styles.borderContainer,
          top: -spaceBetweenCicrcles / 2,
          left: -spaceBetweenCicrcles / 2,
        }}
      >
        <Svg height={actualWidth} width={actualWidth}>
          <Path
            d={`
              M ${start.x} ${start.y}
              A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}`}
            fill="none"
            stroke="grey"
            strokeWidth="4"
          />
          <Path
            d={`
              M ${start.x} ${start.y}
              A ${radius} ${radius} 0 ${progress.side} 1 ${progress.x} ${
              progress.y
            }`}
            fill="none"
            stroke="#ffcb18"
            strokeWidth="4"
          />
        </Svg>
        <View
          style={{ ...styles.point, top: progress.y - 8, left: progress.x - 8 }}
        />
      </View>
    </View>
  );
}

function calcPos(percent, width, radius) {
  // 135 to 405 = 270 + 135
  const degrees = (270 * percent) / 100 + 135;
  return {
    x: radius * Math.cos(degrees * (Math.PI / 180)) + width / 2,
    y: radius * Math.sin(degrees * (Math.PI / 180)) + width / 2,
    side: degrees > 315 ? 1 : 0,
  };
}
