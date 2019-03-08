import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  TextInput,
  Animated,
  Keyboard
} from 'react-native';
import { newTraining, updateTraining } from '../redux/actions/trainingsActions';
import Phase from '../components/Phase';
import DurationPicker from '../components/DurationPicker';

class Editing extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title="save"
      />
    )
  });

  constructor(props) {
    super(props);

    const isNewTraining = props.navigation.getParam('trainingIndex') === undefined;
    this.trainingId = isNewTraining
      ? props.trainingsState.trainings.length
      : props.navigation.getParam('trainingIndex');
    const hydrateTraining = isNewTraining
      ? {
        name: 'New training',
        phases: [
          {
            name: 'phase 1',
            repetitions: 1,
            steps: []
          }
        ]
      }
      : {
        ...props.trainingsState.trainings[this.trainingId]
      };

    this.training = hydrateTraining;
    this.state = {
      training: hydrateTraining
    };

    if (isNewTraining) {
      props.newTraining(hydrateTraining);
    }

    this.keyboardHeight = new Animated.Value(0);
    this.scrollView = React.createRef();
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.pickerState.isVisible) {
      Animated.timing(this.keyboardHeight, {
        duration: 100,
        toValue: 250
      }).start();
    } else if (!nextProps.pickerState.isVisible) {
      Animated.timing(this.keyboardHeight, {
        duration: 100,
        toValue: 0
      }).start();
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }


  onPhaseUpdate(phaseId, payload) {
    if (payload) {
      this.training.phases = [
        ...this.training.phases.slice(0, phaseId),
        payload,
        ...this.training.phases.slice(phaseId + 1)
      ];
      this.updateReduxTraining();
    } else {
      this.training.phases = [
        ...this.training.phases.slice(0, phaseId),
        ...this.training.phases.slice(phaseId + 1)
      ];
      this.updateReduxTraining();
    }
  }

  newPhase = () => {
    const phaseNumber = this.training.phases.length + 1;
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const phases = this.training.phases.concat({
      name: `phase ${phaseNumber}`,
      repetitions: 1,
      steps: [
        {
          name: null,
          duration: null,
          key: `s-${timeStamp}`
        }
      ]
    });
    this.training.phases = phases;
    this.setState({
      training: this.training
    });
  };

  keyboardWillShow = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.startCoordinates.height - 30,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0,
    }).start();
  };


  updateName = (value) => {
    this.training.name = value;
    this.setState({
      training: {
        ...this.training,
        name: value
      }
    });
  };

  updateReduxTraining = () => {
    this.props.updateTraining(this.trainingId, this.training);
  };

  render() {
    const phases = this.state.training.phases.map((element, index) => (
      <Phase
        name={element.name}
        repetitions={element.repetitions}
        steps={element.steps}
        key={index}
        phaseDidUpdate={(payload) => {
          this.onPhaseUpdate(index, payload);
        }}
      />
    ));
    return (
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'flex-start'
        }}
      >
        <Animated.View
          style={{ paddingBottom: this.keyboardHeight }}
        >
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ flexGrow: 2 }}
            ref={(ref) => { this.scrollView = ref; }}
          >
            <TextInput
              value={this.state.training.name}
              onChangeText={this.updateName}
              onEndEditing={this.updateReduxTraining}
              style={{
                fontSize: 40,
                marginVertical: 20,
                fontWeight: 'bold',
                borderWidth: 0,
                alignSelf: 'flex-start',
                paddingLeft: 20
              }}
            />
            {phases}
            <Button title="+" onPress={this.newPhase} />
          </ScrollView>
        </Animated.View>

        {this.props.pickerState.isVisible && (
          <DurationPicker
            value={
              this.props.pickerState.value
                ? this.props.pickerState.value
                : false
            }
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer,
  pickerState: state.pickerReducer
});

const mapDispatchToProps = dispatch => ({
  newTraining: (training) => {
    dispatch(newTraining(training));
  },
  updateTraining: (trainingId, training) => {
    dispatch(updateTraining(trainingId, training));
  }
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editing);

export default componentContainer;
