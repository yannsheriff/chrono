
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import moment from "moment";


export default class trainingList extends Component {


  humanize(sec_num) {
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      
      hours = hours > 0 ? hours+'h ' : ''
      minutes = minutes > 0 ? minutes+'m ' : ''
      seconds = seconds > 0 ? seconds+'s ' : ''

      return hours+minutes+seconds;
  }

  getTotalTime(el) {
    var reduce = (accumulator, currentValue) => accumulator + currentValue
    var reducePhase = (accumulator, currentValue) => accumulator + currentValue.duration
    var concatTable = el.phases.map(phase => {
      var time = phase.steps.reduce(reducePhase, 0)
      return time * phase.repetitions
    })
    let total = concatTable.reduce(reduce, 0)
    let formatedTotal = this.humanize(total)
    return formatedTotal
  }

  render() {
   
    var trainings = this.props.trainings.map(el => {
      let duration = this.getTotalTime(el)
        return (
          <TouchableOpacity 
            style={styles.training}
            onPress={ () => this.props.navigation.navigate('Chrono', { training : el })}
          >
                <Text> { el.name } </Text>
                <Text> { duration } </Text>
          </TouchableOpacity>
        )
    })


    return (
      <View style={styles.container}>
        <Text style={ styles.text }>Hey Dude, </Text>
        <Text style={{...styles.text, marginBottom: 30}}>What do you want to do today ? </Text>
          { trainings }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center'
  },
  training: { 
    height: 50, 
    borderRadius: 10, 
    marginBottom: 10, 
    backgroundColor: '#A3F7B5', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width:'80%',
    flexDirection: 'row'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25
  }
});
