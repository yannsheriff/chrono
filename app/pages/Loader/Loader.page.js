//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Router from '../../Router';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReduxState: this.props.state,
    };
  }

  componentDidMount() {
    console.log(this.props.state);
    this.props.populateStore();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps)
    this.setState(
      {
        ReduxState: nextProps.state,
      },
      () => console.log(this.state.ReduxState),
    );
  }

  render() {
    const render =
      this.props.state.trainingsReducer.trainings !== undefined ? (
        <Router />
      ) : (
        <View>
          <Text>loading..</Text>
        </View> /* <Loader /> */
      );
    return render;
  }
}
