// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import SmartChronoData from './smart-components/SmartChronoData';
import ChronoComponent from './components/Chrono';
import SmartTrainingListEdition from './smart-components/SmartTrainingListEdition';
import SmartEditTrainig from './smart-components/SmartEditTrainig';



const HomeStack = createStackNavigator({
  Home: SmartChronoData,
  Chrono: ChronoComponent,
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



