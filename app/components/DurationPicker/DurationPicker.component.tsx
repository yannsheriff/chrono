import React, { Component } from 'react';
import { View, Button, Picker, Text } from 'react-native';
import styles from './DurationPicker.style';
import screen from '~/helpers/ScreenSize';

interface Props {
  value: number;
  updatePickerValue: (seconds: number) => unknown;
  closePicker: () => unknown;
}

export default class DurationPicker extends Component<Props> {
  seconds: Array<number>;
  minutes: Array<number>;
  hours: Array<number>;
  state: {
    seconds: number;
    minutes: number;
    hours: number;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
    };

    this.seconds = [];
    this.minutes = [];
    this.hours = [];
  }

  componentDidMount() {
    if (this.props.value) {
      this.setPickerValues(this.props.value);
    }

    setTimeout(() => {
      for (let index = 0; index < 60; index++) {
        this.seconds.push(index);
      }

      for (let index = 0; index < 60; index++) {
        this.minutes.push(index);
      }
      for (let index = 0; index < 24; index++) {
        this.hours.push(index);
      }

      this.forceUpdate();
    }, 500);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value) {
      this.setPickerValues(nextProps.value);
    }
  }

  setPickerValues(seconds: number) {
    const minutes = seconds / 60;
    const secondLeft = seconds % 60;
    const hours = minutes / 60;
    const minutesLeft = minutes % 60;
    this.setState({
      seconds: secondLeft,
      minutes: Math.floor(minutesLeft),
      hours: Math.floor(hours),
    });
  }

  valueChange() {
    const totalDuration =
      this.state.seconds + this.state.minutes * 60 + this.state.hours * 3600;
    this.props.updatePickerValue(totalDuration);
  }

  render() {
    const seconds = this.seconds.map((value, index) => (
      <Picker.Item label={`${index}`} value={value} />
    ));
    const minutes = this.minutes.map((value, index) => (
      <Picker.Item label={`${index}`} value={value} />
    ));
    const hours = this.hours.map((value, index) => (
      <Picker.Item label={`${index}`} value={value} />
    ));

    return (
      <View style={styles.container}>
        <View>
          <Button title="done" onPress={() => this.props.closePicker()} />
        </View>
        <View style={styles.pickersContainer}>
          <Picker
            selectedValue={this.state.hours}
            style={styles.picker}
            onValueChange={itemValue =>
              this.setState({ hours: itemValue }, this.valueChange)
            }
          >
            {hours}
          </Picker>
          <Text
            style={{
              ...styles.pickerText,
              left: screen.widthPercent * 22,
            }}
          >
            {' '}
            hours{' '}
          </Text>
          <Picker
            selectedValue={this.state.minutes}
            style={styles.picker}
            onValueChange={itemValue =>
              this.setState({ minutes: itemValue }, this.valueChange)
            }
          >
            {minutes}
          </Picker>
          <Text
            style={{
              ...styles.pickerText,
              left: screen.widthPercent * 55,
            }}
          >
            {' '}
            min{' '}
          </Text>
          <Picker
            selectedValue={this.state.seconds}
            style={styles.picker}
            onValueChange={itemValue =>
              this.setState({ seconds: itemValue }, this.valueChange)
            }
          >
            {seconds}
          </Picker>
          <Text
            style={{
              ...styles.pickerText,
              left: screen.widthPercent * 89,
            }}
          >
            {' '}
            sec{' '}
          </Text>
        </View>
      </View>
    );
  }
}
