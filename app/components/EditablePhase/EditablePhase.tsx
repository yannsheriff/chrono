import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import EditableStep from '../EditableStep';
import styles from './style';
import { Step } from '../EditableStep/EditableStep.component';

export type Phase = {
  name: string;
  repetitions: number;
  steps: Array<Step>;
};

interface Props {
  steps: Array<Step>;
  name: string;
  repetitions: number;
  phaseDidUpdate: (phase: Phase | false) => unknown;
}

export default class EditablePhase extends Component<Props> {
  steps: Array<Step>;
  state: {
    name: string;
    repetitions: number;
    steps: Array<Step>;
  };

  constructor(props: Props) {
    super(props);
    this.steps = props.steps;
    this.state = {
      name: props.name,
      repetitions: props.repetitions,
      steps: props.steps,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.steps !== nextProps.steps) {
      this.setState({
        steps: nextProps.steps,
      });
    }
  }

  onStepUpdate(stepId: number, payload: Step | false) {
    if (payload) {
      this.steps[stepId] = payload;
      this.updatePhase();
    } else {
      const immutableStep = this.steps
        .slice(0, stepId)
        .concat(this.steps.slice(stepId + 1));
      this.steps = immutableStep;
      this.updatePhase();
    }
  }

  addRepetitions = () => {
    this.setState(
      {
        repetitions: this.state.repetitions + 1,
      },
      () => {
        this.updatePhase();
      },
    );
  };

  removeRepetitions = () => {
    if (this.state.repetitions - 1 > 0) {
      this.setState(
        {
          repetitions: this.state.repetitions - 1,
        },
        () => {
          this.updatePhase();
        },
      );
    } else {
      this.deletePhase();
    }
  };

  nameDidchange = () => {
    this.updatePhase();
  };

  nameChange = (name: string) => {
    this.setState({ name });
  };

  newStep = () => {
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const concatedSteps = this.steps.concat({
      name: 'exercice',
      duration: 10,
      key: `s-${timeStamp}`,
    });

    this.steps = concatedSteps;
    this.updatePhase();
  };

  updatePhase = () => {
    this.props.phaseDidUpdate({
      name: this.state.name,
      repetitions: this.state.repetitions,
      steps: this.steps,
    });
    console.log(this.steps);
    this.setState({
      steps: this.steps,
    });
  };

  deletePhase = () => {
    this.props.phaseDidUpdate(false);
  };

  render() {
    const steps = this.state.steps.map((element, index) => {
      const key = `k-${index}`;
      return (
        <EditableStep
          name={element.name}
          duration={element.duration}
          id={element.key}
          key={key}
          stepDidUpdate={step => {
            this.onStepUpdate(index, step);
          }}
        />
      );
    });

    return (
      <View style={styles.phase}>
        <View style={styles.phaseHeader}>
          <View>
            <TextInput
              onChangeText={this.nameChange}
              onEndEditing={this.nameDidchange}
              value={this.state.name}
            />
          </View>
          <View style={styles.repetitions}>
            <Button title="-" onPress={this.removeRepetitions} />
            <Text> x{this.state.repetitions} </Text>
            <Button title="+" onPress={this.addRepetitions} />
          </View>
        </View>
        <View>
          {steps}
          <Button title="+" onPress={this.newStep} />
        </View>
      </View>
    );
  }
}
