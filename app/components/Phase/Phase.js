import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import EditableStep from '../EditableStep';
import styles from './style';

export default class Phase extends Component {
  constructor(props) {
    super(props);
    this.steps = props.steps;
    this.state = {
      name: props.name,
      repetitions: props.repetitions,
      steps: props.steps
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.steps !== nextProps.steps) {
      this.setState({
        steps: nextProps.steps
      });
    }
  }

  onStepUpdate(stepId, payload) {
    if (payload) {
      this.steps[stepId] = payload;
      this.phaseDidUpdate();
    } else {
      const immutableStep = this.steps.slice(0, stepId).concat(this.steps.slice(stepId + 1));
      this.steps = immutableStep;
      this.phaseDidUpdate();
    }
  }

  addRepetitions = () => {
    this.setState(
      {
        repetitions: this.state.repetitions + 1
      },
      () => {
        this.phaseDidUpdate();
      }
    );
  };

  removeRepetitions = () => {
    if (this.state.repetitions - 1 > 0) {
      this.setState(
        {
          repetitions: this.state.repetitions - 1
        },
        () => {
          this.phaseDidUpdate();
        }
      );
    } else {
      this.phaseDidUpdate('REMOVE');
    }
  };

  nameDidchange = () => {
    this.phaseDidUpdate();
  }

  nameChange = (name) => {
    this.setState({ name });
  }

  newStep = () => {
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const concatedSteps = this.steps.concat({
      name: null,
      duration: null,
      key: `s-${timeStamp}`
    });

    this.steps = concatedSteps;
    this.phaseDidUpdate();
  };

  phaseDidUpdate = (remove) => {
    if (remove === 'REMOVE') {
      this.props.phaseDidUpdate(false);
    } else {
      this.props.phaseDidUpdate({
        name: this.state.name,
        repetitions: this.state.repetitions,
        steps: this.steps
      });
      console.log(this.steps);
      this.setState({
        steps: this.steps
      });
    }
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
          stepDidUpdate={(step) => {
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
            <Text>
              {' '}
x
              {this.state.repetitions}
              {' '}
            </Text>
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
