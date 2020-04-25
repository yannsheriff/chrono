//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Router from '~/Router';
import { RootState } from '~/redux/store';

interface Props {
  state: RootState;
  populateStore: () => unknown;
}

export default class Loader extends Component<Props> {
  state: {
    ReduxState: RootState;
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      ReduxState: this.props.state,
    };
  }

  componentDidMount() {
    console.log(this.props.state);
    this.props.populateStore();
  }

  componentWillReceiveProps(nextProps: Props) {
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
