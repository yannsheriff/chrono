/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Store from './app/config/store';
import Loading from './app/screens/Loader';

class App extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={Store}>
        <Loading />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
