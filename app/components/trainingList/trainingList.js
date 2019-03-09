
import React, { Component } from 'react';
import {
  View,
  TouchableHighlight
} from 'react-native';
import styles from './style';
import TrainingItem from '../TrainingItem';
import { minutes } from '../../helpers/humanize';


export default class trainingList extends Component {
  getTotalTime = (el) => {
    const reduce = (accumulator, currentValue) => accumulator + currentValue;
    const reducePhase = (accumulator, currentValue) => accumulator + currentValue.duration;
    const concatTable = el.phases.map((phase) => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    const formatedTotal = minutes(total);
    return formatedTotal;
  }

  render() {
    const trainings = this.props.trainings.map((el) => {
      const duration = this.getTotalTime(el);

      return (
        <TouchableHighlight
          style={{ marginVertical: 10, width: '100%' }}
          onPress={() => this.props.navigation.navigate('Chrono', { training: el })}
        >

          <TrainingItem
            name={el.name}
            duration={duration}
            difficulty="easy"
          />

        </TouchableHighlight>

      );
    });


    return (
      <View style={styles.container}>
        { trainings }
      </View>
    );
  }
}
