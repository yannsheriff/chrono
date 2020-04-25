import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, { Component } from 'react';
import moment from 'moment';
import Sound from 'react-native-sound';
import KeepAwake from 'react-native-keep-awake';
import StepList from '~/components/stepList';
import StepListHeader from '~/components/StepListHeader';
import ChronoRemote from '~/components/ChronoRemote/ChronoRemote';
import screen from '~/helpers/ScreenSize';
import { musiques } from '~/assets/sound';
import statsData from '~/data/stats';
import NextStep from '~/components/NextStep';
import BottomDrawer from '~/components/BottomDrawer';
import ChronoDisplay from '~/components/ChronoDisplay';
import { secondColor } from '~/config/style';
import { icons } from '~/assets/img';
import { Step } from '~/components/EditableStep/EditableStep.component';
import { Training } from '~/components/trainingList/trainingList';
import {
  NavigationStackProp,
  NavigationStackOptions,
} from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp<{ training: Training }>;
}

export default class Chrono extends Component<Props> {
  soundIsPlaying: boolean;
  remaingTime: number;
  steps: Array<Step>;
  bip: Sound;
  whoop: Sound;
  chrono: number = 0;
  trainingEndTime: number = 0;
  isLongPhase: boolean = false;
  state: {
    completeTraining: Training;
    currentStep: Step;
    currentStepIndex: number;
    currentTimer: null | number;
    currentStepProgress: number;
    haveStarted: boolean;
    isPaused: boolean;
    totalTime: number;
  };

  static navigationOptions: NavigationStackOptions = {
    header: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.soundIsPlaying = false;
    this.remaingTime = 0;

    this.steps = [];
    this.bip = new Sound(musiques.bip, error => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      console.log(`duration in seconds: ${this.bip.getDuration()}`);
      this.bip.setVolume(0.1);
    });
    this.whoop = new Sound(musiques.whoop, error => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });

    const training: Training = this.props.navigation.getParam('training');
    const totalTime = this.getTotalTime(training);
    this.remaingTime = totalTime;

    training.phases.forEach(phase => {
      for (let index = 0; index < phase.repetitions; index++) {
        phase.steps.forEach(step => {
          this.steps.push(step);
        });
      }
    });

    this.state = {
      completeTraining: props.navigation.getParam('training'),
      currentStep: this.steps[0],
      currentStepIndex: 0,
      currentTimer: this.steps[0].duration,
      currentStepProgress: 0,
      haveStarted: false,
      isPaused: true,
      totalTime: 0,
    };
  }

  getTotalTime = (training: Training) => {
    const reduce = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;
    const reducePhase = (accumulator: number, currentValue: Step) =>
      accumulator + currentValue.duration;
    const concatTable = training.phases.map(phase => {
      const time = phase.steps.reduce(reducePhase, 0);
      return time * phase.repetitions;
    });
    const total = concatTable.reduce(reduce, 0);
    return total;
  };

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
      .add(this.state.currentTimer || 0, 'second')
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

  launchChrono = (endTime: number) => {
    this.chrono = setInterval(() => {
      const now = new Date().getTime();
      const sub = endTime - now;
      const seconds = sub / 1000;
      this.remaingTime = (this.trainingEndTime - now) / 1000;
      const percentage =
        100 - (seconds / this.state.currentStep.duration) * 100;
      this.setState({
        currentTimer: seconds,
        currentStepProgress: percentage,
        haveStarted: true,
        isPaused: false,
      });

      if (percentage < 50 && percentage > 49 && this.isLongPhase) {
        this.bip.play();
      }

      if (seconds <= 2.1 && !this.soundIsPlaying) {
        this.soundIsPlaying = true;
        this.bip.play(success => {
          if (success) {
            this.soundIsPlaying = false;
          }
        });
      }
      if (sub <= 0) {
        this.soundIsPlaying = true;
        this.whoop.play(success => {
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
        currentStep: this.steps[this.state.currentStepIndex + 1],
      },
      () => {
        this.startCurrentStep();
      },
    );
  };

  stopTraining = () => {
    clearInterval(this.chrono);
    this.props.navigation.goBack();
  };

  relplayTraining = () => {
    clearInterval(this.chrono);
    this.remaingTime +=
      this.state.currentStep.duration - (this.state.currentTimer || 0);
    this.startCurrentStep();
  };

  trainingDidEnd = () => {
    const { completeTraining } = this.state;
    const { navigation } = this.props;
    this.setState({ currentTimer: 0 });

    statsData.saveStats({
      date: new Date(),
      id: completeTraining.id,
      training: completeTraining,
    });
    navigation.navigate('MyModal', {
      trainingID: completeTraining.id,
    });
  };

  render() {
    const actualTimer = this.state.currentStep
      ? this.state.currentTimer || 0
      : 0;

    const totalDone = this.state.totalTime - this.remaingTime;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image source={icons.back} style={styles.img} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.chrono}>
          <ChronoDisplay
            currentTimer={Math.ceil(actualTimer)}
            step={this.steps[this.state.currentStepIndex]}
            currentStepIndex={this.state.currentStepIndex}
            totalSteps={this.steps.length}
            currentStepProgress={this.state.currentStepProgress}
            width={screen.widthPercent * 77}
          />
          <ChronoRemote
            haveStarted={this.state.haveStarted}
            isPaused={this.state.isPaused}
            didPlayPause={this.chronoStateHandler}
            didStop={this.stopTraining}
            didReplay={this.relplayTraining}
          />
          {this.steps[this.state.currentStepIndex + 1] && (
            <NextStep step={this.steps[this.state.currentStepIndex + 1]} />
          )}
        </View>
        <BottomDrawer
          containerHeight={screen.heightPercent * 80}
          startUp={false}
          downDisplay={(screen.height / 100) * 60}
          backgroundColor="#fff"
        >
          <StepListHeader
            name={this.state.completeTraining.name}
            totalTime={this.state.totalTime}
            doneTime={totalDone}
          />
          <StepList
            steps={this.steps}
            currentStepIndex={this.state.currentStepIndex}
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
    backgroundColor: secondColor,
    paddingTop: screen.heightPercent * 8,
  },
  chrono: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f4f4f4'
  },
  img: {
    marginLeft: screen.widthPercent * 8,
    width: 21,
    height: 21,
  },
  centerText: {
    fontSize: 90,
  },
});
