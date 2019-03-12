// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Scenes Imports
// ----------------------------
import Trainings from '../screens/Trainings';
import Chrono from '../screens/Chrono.js';
import EditableList from '../screens/EditableList';
import Editing from '../screens/Editing';


const InitialNavigator = createStackNavigator({
  Home: Trainings,
  Chrono,
  EditTraining: Editing,
});


export default createAppContainer(InitialNavigator);
