
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import styles from './style';
import TrainingItem from '../TrainingItem';
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
      console.log('TCL: trainingList -> render -> duration', duration);

      return (
        <View style={{ marginVertical: 10, width: '100%' }}>
          <TrainingItem />
        </View>
        // <TouchableOpacity
        //   style={styles.training}
        //   onPress={() => this.props.navigation.navigate('Chrono', { training: el })}
        // >
        //   <Text>
        //     {' '}
        //     { el.name }
        //     {' '}
        //   </Text>
        //   <Text>
        //     {' '}
        //     { duration }
        //     {' '}
        //   </Text>
        // </TouchableOpacity>

      );
    });


    return (
      <View style={styles.container}>
        { trainings }
      </View>
    );
  }
}
