
import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Alert
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

  edit = (id) => {

  }

  delete = (id) => {
    Alert.alert('Are you sure ?', 'Do you really want to delete this training ?', [
      {
        text: 'yes',
        onPress: () => {
          this.props.onTrainingDeletionRequest(id);
        },
        style: 'destructive'
      },
      {
        text: 'cancel',
        style: 'cancel'
      }
    ]);
  }

  duplicate = (id) => {

  }

  open = (el) => {
    this.props.navigation.navigate('Chrono', { training: el });
  }

  render() {
    const trainings = this.props.trainings.map((el, index) => {
      const duration = this.getTotalTime(el);

      return (
        <View
          style={{ marginVertical: 10, width: '100%' }}
        >
          <TrainingItem
            name={el.name}
            duration={duration}
            onDelete={() => this.delete(index)}
            onDuplicate={this.duplicate}
            onEdit={this.edit}
            onOpen={() => this.open(el)}
            difficulty="easy"
          />
        </View>
      );
    });


    return (
      <View style={styles.container}>
        { trainings }
      </View>
    );
  }
}
