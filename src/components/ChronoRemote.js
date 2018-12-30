import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

import screen from "../helpers/ScreenSize";
import Step from "./step";

export default class trainingList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var start = (
      <Button title={"start"} onPress={() => this.props.didPlayPause()} />
    );

    var remote = (
      <View style={styles.remoteContainer}>
        <Button
          style={styles.button}
          title={"stop"}
          onPress={() => this.props.didStop()}
        />
        <Button
          title={this.props.isPaused ? "resume" : "pause"}
          onPress={() => this.props.didPlayPause()}
        />
        <Button title={"replay"} onPress={() => this.props.didReplay()} />
      </View>
    );

    return (
      <View style={styles.container}>
        {this.props.haveStarted ? remote : start}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center"
  },
  remoteContainer: {
    flexDirection: "row",
  },
  step: {
    height: 50,
    width: screen.widthPercent * 80,
    borderRadius: 15,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  button: { margin: 20 }
});
