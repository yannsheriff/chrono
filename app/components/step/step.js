
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './style';
import ProgressBar from '../ProgressBar';

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
        <Text style={styles.name}>{this.state.name}</Text>
        <View style={styles.barContainer}>
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={this.props.progress}
            />
          </View>
          <Text style={styles.text}>
            {this.state.duration}
            {' '}
s
          </Text>
        </View>
      </View>
    );
  }
}
