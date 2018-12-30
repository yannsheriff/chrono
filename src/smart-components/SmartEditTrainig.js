import { newTraining, updateTraining } from "../actions/trainingsActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import Phase from "../components/Phase";
import DurationPicker from "../components//DurationPicker";
import { View, Text, Button, ScrollView, TextInput } from "react-native";
import screen from "../helpers/ScreenSize";

class SmartBoilComponent extends Component {
  // static navigationOptions = {
  //     title: 'Detail',
  //     headerLeft: (
  //         <Button
  //           onPress={this.saveAndBack}
  //           title="Back"
  //         />
  //       ),
  // };

  constructor(props) {
    super(props);

    var isNewTraining =
      props.navigation.getParam("trainingIndex") !== undefined ? false : true;
    this.trainingId = isNewTraining
      ? props.trainingsState.trainings.length
      : props.navigation.getParam("trainingIndex");
    var hydrateTraining = isNewTraining
      ? {
          name: "New training",
          phases: [
            {
              name: "phase 1",
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
  }

  newPhase = () => {
    var phaseNumber = this.training.phases.length + 1
    let timeStamp = Math.round(new Date().getTime() / 1000);
    var phases = this.training.phases.concat({
      name: "phase "+phaseNumber,
      repetitions: 1,
      steps: [
        {
          name: null,
          duration: null,
          key: 's-'+timeStamp
        }
      ]
    });
    this.training.phases = phases;
    this.setState({
      training: this.training
    });
  };

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

  updateName = value => {
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
    var phases = this.state.training.phases.map((element, index) => {
      return (
        <Phase
          name={element.name}
          repetitions={element.repetitions}
          steps={element.steps}
          key={index}
          phaseDidUpdate={payload => {
            this.onPhaseUpdate(index, payload);
          }}
        />
      );
    });
    return (
      <View
        style={{
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-start"
        }}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={{ flexGrow: 2 }}
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
              alignSelf: "flex-start",
              paddingLeft: 20
            }}
          />
          {phases}
          <Button title={"+"} onPress={this.newPhase} />
        </ScrollView>
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

const mapStateToProps = state => {
  return {
    screenState: state.screenReducer,
    trainingsState: state.trainingsReducer,
    pickerState: state.pickerReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newTraining: training => {
      dispatch(newTraining(training));
    },
    updateTraining: (trainingId, training) => {
      dispatch(updateTraining(trainingId, training));
    }
  };
};

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartBoilComponent);

export default componentContainer;
