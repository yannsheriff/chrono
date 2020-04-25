/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistedStore from '~/redux/store';
import Router from '~/Router';

const { store, persistor } = persistedStore;
class App extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
