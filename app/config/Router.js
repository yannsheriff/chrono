// Libs Imports
// ----------------------------
import { createAppContainer, createStackNavigator } from 'react-navigation';

// Scenes Imports
// ----------------------------
import Trainings from '../screens/Trainings';
import Chrono from '../screens/Chrono.js';
import Editing from '../screens/Editing';


const InitialNavigator = createStackNavigator({
  Home: Trainings,
  Chrono,
  EditTraining: Editing,
});


export default createAppContainer(InitialNavigator);
