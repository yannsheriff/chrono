import React, { Component } from 'react';
import { View, TouchableHighlight, Alert } from 'react-native';
import styles from './style';
import TrainingItem from '../TrainingItem';
import { minutes } from '~/helpers/humanize';
import { Phase } from '../EditablePhase/EditablePhase';
import { Step } from '../EditableStep/EditableStep.component';
import { NavigationStackProp } from 'react-navigation-stack';

export type Training = {
  name: string;
  difficulty: string;
  id: string;
  phases: Array<Phase>;
};

interface Props {
  navigation: NavigationStackProp;
  trainings: Array<Training>;
  onTrainingDeletionRequest: (id: number) => unknown;
  onNewTrainingRequest: (training: Training) => unknown;
}

export default class trainingList extends Component<Props> {
  state: {
    actualyDraging: number | undefined;
  };
  constructor(props: Props) {
    super(props);

    this.state = {
      actualyDraging: undefined,
    };
  }

  getTotalTime = (training: Training): number => {
    const reduce = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;
    const reducePhase = (accumulator: number, currentValue: Step) =>
      accumulator + currentValue.duration;
    const concatTable = training.phases.map(phase => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    const formatedTotal = minutes(total);
    return formatedTotal;
  };

  getTotalRounds = (training: Training): number => {
    const reduce = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;
    const concatTable = training.phases.map(phase => {
      const steps = phase.steps.length;
      return steps * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    return total;
  };

  edit = (index: number) => {
    this.setState({ actualyDraging: undefined });
    this.props.navigation.navigate('EditTraining', { trainingIndex: index });
  };

  delete = (index: number) => {
    Alert.alert(
      'Are you sure ?',
      'Do you really want to delete this training ?',
      [
        {
          text: 'yes',
          onPress: () => {
            this.props.onTrainingDeletionRequest(index);
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

  open = (training: Training) => {
    this.setState({ actualyDraging: undefined });
    this.props.navigation.navigate('Chrono', {
      training: training,
    });
  };

  onDrag = (index: number) => {
    if (index !== this.state.actualyDraging) {
      this.setState({ actualyDraging: index });
    }
  };

  render() {
    const trainings = this.props.trainings.map((training, index) => {
      const duration = this.getTotalTime(training);
      const rounds = this.getTotalRounds(training);

      return (
        <View
          style={{
            marginVertical: 12,
            width: '100%',
          }}
          key={`training-${index}`}
        >
          <TrainingItem
            name={training.name}
            duration={duration}
            rounds={rounds}
            isDragging={index === this.state.actualyDraging}
            onDelete={() => this.delete(index)}
            onDuplicate={() => this.duplicate(training)}
            onDrag={() => this.onDrag(index)}
            onEdit={() => this.edit(index)}
            onOpen={() => this.open(training)}
            difficulty={training.difficulty}
          />
        </View>
      );
    });

    return <View style={styles.container}>{trainings}</View>;
  }
}
