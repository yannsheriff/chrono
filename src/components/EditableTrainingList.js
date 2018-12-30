



import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert, 
  Bu
} from 'react-native'


export default class trainingList extends Component {


  deleteTraining(id)  {
    this.props.onTrainingDeletionRequest(id)
  }

  render() {

    var trainings = this.props.trainings.map((el, index) => {
        return (
          <TouchableOpacity 
            style={styles.training}
            onPress={ () => this.props.navigation.navigate('EditTraining', { trainingIndex : index })}
            onLongPress={ () => this.deleteTraining(index) }
          >
                <Text> { el.name } </Text>
          </TouchableOpacity>
        )
    })


    return (
      <View style={styles.container}>
          { trainings }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
});
