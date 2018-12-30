
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import screen from '../helpers/ScreenSize'
import { red } from 'ansi-colors';


export default class Step extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      name: this.props.name,
      duration: this.props.duration,
      progress: this.props.progress ? this.props.progress : 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.progress !== this.state.progress) {
      this.setState({
        progress: nextProps.progress
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
          <View style={styles.step}>
              <View style={{...styles.progressBar, width: this.state.progress+'%'}}></View>
              <Text>{this.state.name}</Text>
              <Text>{this.state.duration}</Text>
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
    height: 50, 
    borderRadius: 10, 
    marginBottom: 10, 
    backgroundColor: '#E5F9E0', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    flexDirection: 'row',
    width: screen.widthPercent * 80,
    overflow: 'hidden', 
    position: 'relative'
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#A3F7B5',
  }
});
