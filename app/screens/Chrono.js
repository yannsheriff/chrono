import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import React, { Component } from 'react';
import moment from 'moment';
import Sound from 'react-native-sound';
import KeepAwake from 'react-native-keep-awake';
import StepList from '../components/stepList';
import StepListHeader from '../components/StepListHeader';
import ChronoRemote from '../components/ChronoRemote/ChronoRemote';
import screen from '../helpers/ScreenSize';
import { musiques } from '../assets/sound';
import statsData from '../data/stats';
import NextStep from '../components/NextStep';
import BottomDrawer from '../components/BottomDrawer';
import { secondColor } from '../config/style';


export default class Chrono extends Component {
  constructor(props) {
    super(props);
    this.soundIsPlaying = false;
    this.remaingTime = 0;
    this.state = {
      completeTraining: props.navigation.getParam('training'),
      currentStep: {},
      currentStepIndex: 0,
      currentTimer: null,
      currentStepProgress: 0,
      haveStarted: false,
      isPaused: true,
      totalTime: 0,
    };

    this.steps = [];
    this.bip = new Sound(musiques.bip, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      console.log(`duration in seconds: ${this.bip.getDuration()}`);
      this.bip.setVolume(0.1);
    });
    this.whoop = new Sound(musiques.whoop, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });
  }

  componentDidMount() {
    const training = this.props.navigation.getParam('training');
    const totalTime = this.getTotalTime(training);
    this.remaingTime = totalTime;

    training.phases.forEach((element) => {
      for (let index = 0; index < element.repetitions; index++) {
        element.steps.forEach((element) => {
          this.steps.push(element);
        });
      }
    });

    this.setState({
      totalTime,
      completeTraining: training,
      currentStep: this.steps[this.state.currentStepIndex],
      currentTimer: this.steps[this.state.currentStepIndex].duration
    });
  }

  getTotalTime = (el) => {
    const reduce = (accumulator, currentValue) => accumulator + currentValue;
    const reducePhase = (accumulator, currentValue) => accumulator + currentValue.duration;
    const concatTable = el.phases.map((phase) => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    return total;
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
    const endTime = moment()
      .add(this.state.currentTimer, 'second')
      .toDate()
      .getTime();

    this.trainingEndTime = moment()
      .add(this.remaingTime, 'seconds')
      .toDate()
      .getTime();

    this.launchChrono(endTime);
  };

  startCurrentStep = () => {
    const endTime = moment()
      .add(this.state.currentStep.duration, 'seconds')
      .toDate()
      .getTime();

    this.trainingEndTime = moment()
      .add(this.remaingTime, 'seconds')
      .toDate()
      .getTime();

    this.isLongPhase = this.state.currentStep.duration > 20;
    this.launchChrono(endTime);
  };

  launchChrono = (endTime) => {
    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = sub / 1000;
      this.remaingTime = (this.trainingEndTime - now) / 1000;
      const percentage = 100 - (seconds / this.state.currentStep.duration) * 100;
      this.setState({
        currentTimer: seconds,
        currentStepProgress: percentage,
        haveStarted: true,
        isPaused: false
      });

      if (percentage < 50 && percentage > 49 && this.isLongPhase) {
        this.bip.play();
      }

      if (seconds <= 2.1 && !this.soundIsPlaying) {
        this.soundIsPlaying = true;
        this.bip.play((success) => {
          if (success) {
            this.soundIsPlaying = false;
          }
        });
      }
      if (sub <= 0) {
        this.soundIsPlaying = true;
        this.whoop.play((success) => {
          if (success) {
            this.soundIsPlaying = false;
          }
        });
        clearInterval(this.chrono);
        this.stepDidEnd();
      }
    }, 50);
  };

  stepDidEnd = () => {
    if (this.steps[this.state.currentStepIndex + 1]) {
      this.setNextStep();
    } else {
      this.trainingDidEnd();
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
    this.remaingTime += this.state.currentStep.duration - this.state.currentTimer;
    this.startCurrentStep();
  };

  trainingDidEnd = () => {
    this.setState({ currentTimer: 0 });

    statsData.saveStats({ date: new Date(), training: this.state.completeTraining });
    Alert.alert('End', 'well Done you finished');
  }

  render() {
    const actualTimer = this.state.currentStep ? this.state.currentTimer : 'null';

    const totalDone = this.state.totalTime - this.remaingTime;

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
          <NextStep />
        </View>
        <BottomDrawer
          containerHeight={screen.heightPercent * 80}
          startUp={false}
          downDisplay={screen.height / 100 * 52}
          backgroundColor="#fff"
        >
          {/* <Text> test </Text> */}
          <StepListHeader
            name={this.state.completeTraining.name}
            totalTime={this.state.totalTime}
            doneTime={totalDone}
          />
          <StepList
            steps={this.steps}
            currentStep={this.state.currentStepIndex}
            currentStepProgress={this.state.currentStepProgress}
          />
        </BottomDrawer>

        <KeepAwake />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: secondColor
  },
  chrono: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screen.height / 2.5,
    // backgroundColor: '#f4f4f4'
  },
  centerText: {
    fontSize: 90,
  }
});
