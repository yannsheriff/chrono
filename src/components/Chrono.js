import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { Component } from "react";
import StepList from "./stepList";
import ChronoRemote from "./ChronoRemote";
import moment from "moment";
import screen from "../helpers/ScreenSize";
export default class Chrono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeTraining: props.navigation.getParam("training"),
      currentStep: {},
      currentStepIndex: 0,
      currentTimer: null,
      currentStepProgress: 0,
      haveStarted: false,
      isPaused: true
    };

    this.steps = [];
  }

  componentDidMount() {
    var training = this.props.navigation.getParam("training");

    training.phases.forEach(element => {
      for (let index = 0; index < element.repetitions; index++) {
        element.steps.forEach(element => {
          this.steps.push(element);
        });
      }
    });

    this.setState({
      completeTraining: training,
      currentStep: this.steps[this.state.currentStepIndex],
      currentTimer: this.steps[this.state.currentStepIndex].duration
    });
  }

  chronoStateHandler = () => {
    if (this.state.isPaused) {
      this.state.haveStarted
        ? this.resumeCurrentStep()
        : this.startCurrentStep();
    } else {
      this.pauseCurrentStep();
    }
  };

  pauseCurrentStep = () => {
    clearInterval(this.chrono);
    this.setState({ isPaused: true });
  };

  resumeCurrentStep = () => {
    var endTime = moment()
      .add(this.state.currentTimer, "second")
      .toDate()
      .getTime();
    this.launchChrono(endTime);
  };

  startCurrentStep = () => {
    var endTime = moment()
      .add(this.state.currentStep.duration, "second")
      .toDate()
      .getTime();
    this.launchChrono(endTime);
  };

  launchChrono = endTime => {
    this.chrono = setInterval(() => {
      var now = new Date().getTime();
      var sub = endTime - now;
      var seconds = (sub % (1000 * 60)) / 1000;
      var percentage = 100 - (seconds / this.state.currentStep.duration) * 100;
      this.setState({
        currentTimer: seconds,
        currentStepProgress: percentage,
        haveStarted: true,
        isPaused: false
      });
      if (sub <= 0) {
        clearInterval(this.chrono);
        this.stepDidEnd();
      }
    }, 50);
  };

  stepDidEnd = () => {
    if (this.steps[this.state.currentStepIndex + 1]) {
      this.setNextStep();
    } else {
      this.setState({ currentTimer: 0 });
      Alert.alert("End", "well Done you finished");
    }
  };

  setNextStep = () => {
    this.setState(
      {
        currentStepIndex: this.state.currentStepIndex + 1,
        currentStep: this.steps[this.state.currentStepIndex + 1]
      },
      () => {
        this.startCurrentStep();
      }
    );
  };

  stopTraining = () => {
    clearInterval(this.chrono);
    this.props.navigation.goBack();
  };

  relplayTraining = () => {
    clearInterval(this.chrono);
    this.startCurrentStep();
  };

  render() {
    var actualTimer = this.state.currentStep ? this.state.currentTimer : "null";

    return (
      <View style={styles.container}>
        <View style={styles.chrono}>
          <Text style={styles.centerText}>
            { Math.ceil(actualTimer) }
          </Text>
          <ChronoRemote
            haveStarted={this.state.haveStarted}
            isPaused={this.state.isPaused}
            didPlayPause={this.chronoStateHandler}
            didStop={this.stopTraining}
            didReplay={this.relplayTraining}
          />
        </View>
        <StepList
          steps={this.steps}
          currentStep={this.state.currentStepIndex}
          currentStepProgress={this.state.currentStepProgress}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-start"
  },
  chrono: {
    justifyContent: "center", 
    alignItems: 'center',
    height: screen.height/2.5, 
    backgroundColor: '#f4f4f4'
  },
  centerText: {
    fontSize: 90, 
  }
});
