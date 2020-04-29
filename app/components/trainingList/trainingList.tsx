import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import styles from './style';
import TrainingItem from '../TrainingItem';
import { minutes } from '~/helpers/humanize';
import { Phase } from '~/pages/Editing/EditablePhase/EditablePhase';
import { Step } from '../EditableStep/EditableStep.component';

export type Training = {
  name: string;
  difficulty: string;
  id: string;
  phases: Phase[];
};

interface Props {
  navigation: NavigationStackProp;
  trainings: Training[];
  onTrainingDeletionRequest: (id: number) => unknown;
  onNewTrainingRequest: (training: Training) => unknown;
}

export default class TrainingList extends Component<Props> {
  public state: {
    actualyDraging: number | undefined;
  };

  private constructor(props: Props) {
    super(props);

    this.state = {
      actualyDraging: undefined,
    };
  }

  private getTotalTime = (training: Training): number => {
    const reduce = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;
    const reducePhase = (accumulator: number, currentValue: Step): number =>
      accumulator + currentValue.duration;
    const concatTable = training.phases.map((phase): number => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });

    const total = concatTable.reduce(reduce, 0);
    const formatedTotal = minutes(total);
    return formatedTotal;
  };

  private getTotalRounds = (training: Training): number => {
    const reduce = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;
    const concatTable = training.phases.map((phase): number => {
      const steps = phase.steps.length;
      return steps * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    return total;
  };

  private edit = (index: number): void => {
    this.setState({ actualyDraging: undefined });
    this.props.navigation.navigate('EditTraining', {
      trainingIndex: index,
    });
  };

  private delete = (index: number): void => {
    Alert.alert(
      'Are you sure ?',
      'Do you really want to delete this training ?',
      [
        {
          text: 'yes',
          onPress: (): void => {
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

  private duplicate = (training: Training): void => {
    this.setState({ actualyDraging: undefined });
    this.props.onNewTrainingRequest(training);
  };

  private open = (training: Training): void => {
    this.setState({ actualyDraging: undefined });
    this.props.navigation.navigate('Chrono', {
      training,
    });
  };

  private onDrag = (index: number): void => {
    if (index !== this.state.actualyDraging) {
      this.setState({ actualyDraging: index });
    }
  };

  public render(): JSX.Element {
    const trainings = this.props.trainings.map(
      (training, index): JSX.Element => {
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
              onDelete={(): void => this.delete(index)}
              onDuplicate={(): void => this.duplicate(training)}
              onDrag={(): void => this.onDrag(index)}
              onEdit={(): void => this.edit(index)}
              onOpen={(): void => this.open(training)}
              difficulty={training.difficulty}
            />
          </View>
        );
      },
    );

    return <View style={styles.container}>{trainings}</View>;
  }
}
