
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './style';
import { humanize } from '../../helpers/humanize';


export default class trainingList extends Component {
  getTotalTime = (el) => {
    const reduce = (accumulator, currentValue) => accumulator + currentValue;
    const reducePhase = (accumulator, currentValue) => accumulator + currentValue.duration;
    const concatTable = el.phases.map((phase) => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    const formatedTotal = humanize(total);
    return formatedTotal;
  }

  render() {
    const trainings = this.props.trainings.map((el) => {
      const duration = this.getTotalTime(el);
      return (
        <TouchableOpacity
          style={styles.training}
          onPress={() => this.props.navigation.navigate('Chrono', { training: el })}
        >
          <Text>
            {' '}
            { el.name }
            {' '}
          </Text>
          <Text>
            {' '}
            { duration }
            {' '}
          </Text>
        </TouchableOpacity>
      );
    });


    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hey Dude, </Text>
        <Text style={{ ...styles.text, marginBottom: 30 }}>What do you want to do today ? </Text>
        { trainings }
      </View>
    );
  }
}
