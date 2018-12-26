// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import SmartTrainingComponent from './smart-components/SmartTraining';
import SmartChronoComponent from './smart-components/SmartChrono';
import SmartTrainingListEdition from './smart-components/SmartTrainingListEdition';
import SmartEditTrainig from './smart-components/SmartEditTrainig';



const HomeStack = createStackNavigator({
  Home: SmartTrainingComponent,
  Chrono: SmartChronoComponent,
});

const EditStack = createStackNavigator({
  TrainingList: SmartTrainingListEdition,
  EditTraining: SmartEditTrainig,
});

const InitialNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Edit: EditStack
})


  export default createAppContainer(InitialNavigator)



