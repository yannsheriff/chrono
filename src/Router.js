// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-time`;
      } else if (routeName === 'Edit') {
        iconName = `ios-hammer`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    inactiveTintColor: 'gray',
  },
})


  export default createAppContainer(InitialNavigator)



