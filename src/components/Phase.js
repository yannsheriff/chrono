import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import screen from "../helpers/ScreenSize";
import EditableStep from "../components/EditableStep";

export default class Phase extends Component {
  constructor(props) {
    super(props);
    this.steps = props.steps;
    this.state = {
      name: props.name,
      repetitions: props.repetitions,
      steps: props.steps
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.steps !== nextProps.steps) {
      this.setState({
        steps: nextProps.steps
      });
    }
  }

  onStepUpdate(stepId, payload) {
    this.steps[stepId] = payload;
    this.phaseDidUpdate();
  }

  addRepetitions = () => {
    this.setState(
      {
        repetitions: this.state.repetitions + 1
      },
      () => {
        this.phaseDidUpdate();
      }
    );
  };

  removeRepetitions = () => {
    if (this.state.repetitions - 1 > 0) {
      this.setState(
        {
          repetitions: this.state.repetitions - 1
        },
        () => {
          this.phaseDidUpdate();
        }
      );
    } else {
      this.phaseDidUpdate("REMOVE");
    }
  };

  nameDidchange = (name) => {
    this.phaseDidUpdate()
  }

  nameChange = (name) => {
    this.setState({ name: name })
  }

  newStep = () => {
    let timeStamp = Math.round(new Date().getTime() / 1000);
    var concatedSteps = this.steps.concat({
      name: null,
      duration: null,
      key: "s-" + timeStamp
    });

    this.steps = concatedSteps;
    this.phaseDidUpdate();
  };

  phaseDidUpdate = remove => {
    if (remove === "REMOVE") {
      this.props.phaseDidUpdate(false);
    } else {
      this.props.phaseDidUpdate({
        name: this.state.name,
        repetitions: this.state.repetitions,
        steps: this.steps
      });

      this.setState({
        steps: this.steps
      });
    }
  };

  render() {
    var steps = this.state.steps.map((element, index) => {
      return (
        <EditableStep
          name={element.name}
          duration={element.duration}
          id={element.key}
          key={index}
          stepDidUpdate={step => {
            this.onStepUpdate(index, step);
          }}
        />
      );
    });

    return (
      <View style={styles.phase}>
        <View style={styles.phaseHeader}>
          <View>
            <TextInput
              onChangeText={this.nameChange}
              onEndEditing={this.nameDidchange}
              value={this.state.name}
            /> 
          </View>
          <View style={styles.repetitions}>
            <Button title={"-"} onPress={this.removeRepetitions} />
            <Text> x{this.state.repetitions} </Text>
            <Button title={"+"} onPress={this.addRepetitions} />
          </View>
        </View>
        <View>
          {steps}
          <Button title={"+"} onPress={this.newStep} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phase: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: screen.widthPercent * 85,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  phaseHeader: {
    height: 20,
    marginBottom: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  }, 
  repetitions: { 
    flexDirection: "row", 
    alignItems: 'center',
    justifyContent: 'center', 
    height: 40,
    // backgroundColor: 'red'
  }
});
