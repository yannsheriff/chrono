
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import screen from '../helpers/ScreenSize'
import Step from "./step";


export default class trainingList extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      steps: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentStepProgress !== this.state.currentStep || nextProps.currentStep !== this.state.currentStep) {
      this.setState({
        progress: nextProps.progress
      })
    }  
  }

  componentDidMount() {
    this.setState({steps: this.props.steps})
  }

  render() {
    var steps = this.state.steps.map((el, index) => {
      var progress = index === this.props.currentStep ? this.props.currentStepProgress : 0
      var displayStep = index >= this.props.currentStep 
      if(displayStep) {
        return (
          <Step 
            name={el.name}
            duration={el.duration}
            progress={progress}
          />
        )
      }
    })

    return (
      <ScrollView  contentContainerStyle={styles.container}>
          { steps }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  },
  step: {
    height: 50, width: screen.widthPercent * 80, borderRadius: 15, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
});
