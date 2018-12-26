
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import screen from '../helpers/ScreenSize'
import { red } from 'ansi-colors';


export default class EditableStep extends Component {

  constructor(props) {
    super(props) 
    this.state = {

    }
  }

 
  render() {
    return (
      <View style={styles.step}>
          <View style={styles.titleContainer}>
              <Text> {this.props.name} </Text>
          </View>
          <View style={styles.timerContainer}>
            <Text> {this.props.duration} </Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  step: {
    flexDirection: 'row',
    height: 60, 
    width: '100%',
    borderRadius: 10, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    marginBottom: 10, 
  }, 
  titleContainer: {
    flex: 0.7
  },
  timerContainer: {
    flex: 0.3
  }
});
