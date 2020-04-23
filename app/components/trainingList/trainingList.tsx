import React, { Component } from 'react';
import { View, TouchableHighlight, Alert } from 'react-native';
import styles from './style';
import TrainingItem from '../TrainingItem';
import { minutes } from '../../helpers/humanize';
import { Phase } from '../Phase/Phase';

export type Training = {
  name: string;
  difficulty: string;
  id: string;
  phases: Array<Phase>;
};

interface Props {
  navigation: any;
  trainings: Array<Training>;
  onTrainingDeletionRequest: (id: string) => unknown;
  onNewTrainingRequest: (training: Training) => unknown;
}

export default class trainingList extends Component<Props> {
  state: {
    actualyDraging: number | undefined;
  };
  constructor(props) {
    super(props);

    this.state = {
      actualyDraging: undefined,
    };
  }

  getTotalTime = el => {
    const reduce = (accumulator, currentValue) => accumulator + currentValue;
    const reducePhase = (accumulator, currentValue) =>
      accumulator + currentValue.duration;
    const concatTable = el.phases.map(phase => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    const formatedTotal = minutes(total);
    return formatedTotal;
  };

  getTotalRounds = el => {
    const reduce = (accumulator, currentValue) => accumulator + currentValue;
    const concatTable = el.phases.map(phase => {
      const steps = phase.steps.length;
      return steps * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    return total;
  };

  edit = id => {
    this.setState({ actualyDraging: undefined });
    this.props.navigation.navigate('EditTraining', { trainingIndex: id });
  };

  delete = id => {
    Alert.alert(
      'Are you sure ?',
      'Do you really want to delete this training ?',
      [
        {
          text: 'yes',
          onPress: () => {
            this.props.onTrainingDeletionRequest(id);
            this.setState({
              actualyDraging: undefined,
            });
          },
          style: 'destructive',
        },
        {
          text: 'cancel',
          style: 'cancel',
        },
      ],
    );
  };

  duplicate = (training: Training) => {
    this.setState({ actualyDraging: undefined });
    this.props.onNewTrainingRequest(training);
  };

  open = el => {
    this.setState({ actualyDraging: undefined });
    this.props.navigation.navigate('Chrono', {
      training: el,
    });
  };

  onDrag = index => {
    if (index !== this.state.actualyDraging) {
      this.setState({ actualyDraging: index });
    }
  };

  render() {
    const trainings = this.props.trainings.map((el, index) => {
      const duration = this.getTotalTime(el);
      const rounds = this.getTotalRounds(el);

      return (
        <View
          style={{
            marginVertical: 12,
            width: '100%',
          }}
          key={`training-${index}`}
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
            difficulty={el.difficulty}
          />
        </View>
      );
    });

    return <View style={styles.container}>{trainings}</View>;
  }
}
