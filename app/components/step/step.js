
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './style';

export default class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      duration: props.duration,
      progress: props.progress ? props.progress : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress !== this.state.progress) {
      this.setState({
        progress: nextProps.progress
      });
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.step}>
          <View style={{ ...styles.progressBar, width: `${this.state.progress}%` }} />
          <Text>{this.state.name}</Text>
          <Text>{this.state.duration}</Text>
        </View>
      </View>
    );
  }
}
