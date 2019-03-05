// Libs Imports
// ----------------------------
import React, { Component, } from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Scenes Imports
// ----------------------------
import Trainings from './screens/Trainings';
import ChronoComponent from './components/Chrono';
import EditableList from './screens/EditableList';
import Editing from './screens/Editing';
import Test from './components/test';



const HomeStack = createStackNavigator({
  Home: Trainings,
  Chrono: ChronoComponent,
});

const EditStack = createStackNavigator({
  TrainingList: EditableList,
  EditTraining: Editing,
});
const TestStack = createStackNavigator({
  Test: Test
});

const InitialNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Edit: EditStack,
  Test: TestStack
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



