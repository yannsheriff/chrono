
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
  constructor(props) {
    super(props);

    this.state = {
      actualyDraging: undefined
    };
  }

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

  getTotalRounds = (el) => {
    const reduce = (accumulator, currentValue) => accumulator + currentValue;
    const concatTable = el.phases.map((phase) => {
      const steps = phase.steps.length;
      return steps * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    return total;
  }

  edit = (id) => {
    this.props.navigation.navigate('EditTraining', { trainingIndex: id });
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

  duplicate = (training) => {
    this.props.onNewTrainingRequest(training);
  }

  open = (el) => {
    this.props.navigation.navigate('Chrono', { training: el });
  }

  onDrag = (index) => {
    if (index !== this.state.actualyDraging) {
      this.setState({ actualyDraging: index });
    }
  }

  render() {
    const trainings = this.props.trainings.map((el, index) => {
      const duration = this.getTotalTime(el);
      const rounds = this.getTotalRounds(el);

      return (
        <View
          style={{ marginVertical: 12, width: '100%' }}
        >
          <TrainingItem
            name={el.name}
            duration={duration}
            rounds={rounds}
            isDragging={index === this.state.actualyDraging}
            onDelete={() => this.delete(index)}
            onDuplicate={() => this.duplicate(el)}
            onDrag={() => this.onDrag(index)}
            onEdit={() => this.edit(index)}
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
