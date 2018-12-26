
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity, 
  Button
} from 'react-native'

import screen from '../helpers/ScreenSize'
import EditableStep from '../components/EditableStep';


export default class Phase extends Component {

  constructor(props) {
    super(props) 

  }

  render() {

    var steps = this.props.steps.map(element => {
        return(
            <EditableStep 
                name={element.name}
                duration={element.duration}
            />
        )
    })

    return (
        <View style={styles.phase}>
            <View style={styles.phaseHeader}>
                <View>
                    <Text> {this.props.name} </Text>
                </View>
                <View>
                    <Text> x{this.props.repetitions} </Text>
                </View>
            </View>
            <View>
                {steps}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  phase: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: screen.widthPercent * 80, 
    borderRadius: 30, 
    backgroundColor: '#F2F2F2', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  phaseHeader: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
