
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
    this.steps = props.steps
    this.state = {
        name: props.name,
        steps: props.steps
    }
  }




  componentWillReceiveProps(nextProps) {
      if( this.state.steps !== nextProps.steps) {
          this.setState({
            steps: nextProps.steps
          })
      }
  }

  onStepUpdate(stepId, payload) {
    this.steps[stepId] = payload
    this.phaseDidUpdate()
  }

    newStep = () => {
        this.steps.push( {
            name : null,
            duration : null
        })
        this.phaseDidUpdate()
    }

    phaseDidUpdate = () => {
        this.props.phaseDidUpdate({
            name: this.state.name,
            steps: this.steps
        })
        this.setState({
            steps :  this.steps
        })
    }

  render() {

    var steps = this.props.steps.map((element, index) => {
        return(
            <EditableStep 
                name={element.name}
                duration={element.duration}
                stepDidUpdate={ step => {
                    this.onStepUpdate(index, step)
                }}
            />
        )
    })

    return (
        <View style={styles.phase}>
            <View style={styles.phaseHeader}>
                <View>
                    <Text> {this.state.name} </Text>
                </View>
                <View>
                    <Text> x{this.props.repetitions} </Text>
                </View>
            </View>
            <View>
                {steps}
                <Button
                    title={'+'}
                    onPress={this.newStep}
                />
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
