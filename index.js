/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { name as appName } from './app.json';
import persistedStore from './app/redux/store';
import Router from './app/Router';

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
