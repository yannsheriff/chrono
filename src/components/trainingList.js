
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'


export default class trainingList extends Component {


  componentDidMount() {
    console.log("​trainingList -> componentWillReceiveProps -> nextProps", this.props)
  }

  render() {

    var trainings = this.props.trainingsState.trainings.map(el => {
        return (
          <TouchableOpacity 
            style={{ height: 50, borderRadius: 15, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}
            onPress={ () => this.props.navigation.navigate('Chrono', { training : el })}
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
