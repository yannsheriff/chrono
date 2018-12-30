
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'


export default class trainingList extends Component {

  render() {

    var trainings = this.props.trainings.map(el => {
        return (
          <TouchableOpacity 
            style={styles.training}
            onPress={ () => this.props.navigation.navigate('Chrono', { training : el })}
          >
                <Text> { el.name } </Text>
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
    justifyContent: 'center', 
    alignItems: 'center', 
    width:'80%' 
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
