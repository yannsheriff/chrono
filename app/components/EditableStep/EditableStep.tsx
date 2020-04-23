import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';

export type Step = {
  name: string;
  duration: number;
  key: number;
};
interface Props {
  name: string;
  duration: number;
  id: number;
  openPicker: (id: number, duration?: number) => unknown;
  stepDidUpdate: (step: Step | false) => unknown;
}

export default class EditableStep extends Component<Props> {
  state: {
    showPicker: boolean;
    duration: number;
    name: string;
  };

  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      duration: props.duration,
      name: props.name,
    };
  }

  componentWillReceiveProps(nextPorps) {
    if (
      nextPorps.pickerState.value !== this.state.duration &&
      nextPorps.pickerState.stepId === nextPorps.id
    ) {
      this.setState({ duration: nextPorps.pickerState.value }, () =>
        this.updateStep(),
      );
    } else if (nextPorps.name !== this.props.name) {
      this.setState({
        duration: nextPorps.duration,
        name: nextPorps.name,
      });
    }
  }

  nameDidchange = name => {
    this.updateStep();
  };

  textChange = name => {
    this.setState({ name: name });
  };

  updateStep() {
    this.props.stepDidUpdate({
      name: this.state.name,
      duration: this.state.duration,
      key: this.props.id,
    });
  }

  deleteStep() {
    this.props.stepDidUpdate(false);
  }

  openPicker = () => {
    if (this.props.duration) {
      this.props.openPicker(this.props.id, this.props.duration);
    } else {
      this.props.openPicker(this.props.id);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.step}
        onLongPress={() => this.deleteStep()}
      >
        <View style={styles.titleContainer}>
          <TextInput
            style={{
              height: 40,
              borderWidth: 0,
              marginLeft: 15,
            }}
            onChangeText={this.textChange}
            onEndEditing={this.nameDidchange}
            placeholder={'name'}
            value={this.state.name}
          />
        </View>
        <View style={styles.timerContainer}>
          <TouchableOpacity onPress={this.openPicker}>
            <Text>
              {' '}
              {this.state.duration
                ? this.state.duration
                : 'choose duration'}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}
