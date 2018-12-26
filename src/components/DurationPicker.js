
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput, 
  TouchableOpacity, 
  Picker
} from 'react-native'

import screen from '../helpers/ScreenSize'
import { red } from 'ansi-colors';


export default class DurationPicker extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      seconds : 0,
      minutes : 0,
      hours : 0
    }

    this.seconds = []
    this.minutes = []
    this.hours = []
   
  }

  componentDidMount() {
    if(this.props.value) {
      this.setPickerValues(this.props.value)
    }

    setTimeout(() => {
      for (let index = 0; index < 60; index++) {
        this.seconds.push(index)   
      }

      for (let index = 0; index < 60; index++) {
          this.minutes.push(
            index
          )   
      }
      for (let index = 0; index < 24; index++) {
          this.hours.push(
            index
          )   
      }

      this.forceUpdate()
    }, 500)

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value) {
      this.setPickerValues(nextProps.value)
    }
  }

  setPickerValues(seconds) {
    var minutes = seconds / 60
    if (minutes > 1 ) {
      var secondLeft = seconds % 60
      var hours = minutes / 60
      if(hours > 1) {
        var minutesLeft = minutes % 60
        this.setState({
          seconds: secondLeft, 
          minutes:  Math.floor(minutesLeft),
          hours: Math.floor(hours)
        })
      } else {

        this.setState({
          seconds: secondLeft, 
          minutes: Math.floor(minutes)
        })
      }
    } else {
      this.setState({seconds: seconds})
    }
  }


 
  render() {
    var seconds = this.seconds.map((value, index) => {
      return (<Picker.Item label={`${index }`} value={value} />)
    })
    var minutes = this.minutes.map((value, index) => {
      return <Picker.Item label={`${index }`} value={value} />
    })
    var hours = this.hours.map((value, index) => {
      return <Picker.Item label={`${index}`} value={value} />
    })

    return (
      <View style={styles.container}>
        <Picker
            selectedValue={this.state.hours}
            style={{ height: 50, width: 100 }}
            // onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
            >
            { hours }
        </Picker>
        <Picker
            selectedValue={this.state.minutes}
            style={{ height: 50, width: 100 }}
            // onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
            >
            { minutes }
        </Picker>
        <Picker
            selectedValue={this.state.seconds}
            style={{ height: 50, width: 100 }}
            // onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
            >
            { seconds }
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 60, 
    width: '100%',
    backgroundColor: 'white'
  }
});

