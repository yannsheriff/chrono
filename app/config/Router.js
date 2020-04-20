// Libs Imports
// ----------------------------
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Scenes Imports
// ----------------------------
import Trainings from '../screens/Trainings';
import Chrono from '../screens/Chrono.js';
import Editing from '../screens/Editing';
import FinishTraining from '../screens/FinishTraining';

const InitialNavigator = createStackNavigator({
  Home: Trainings,
  Chrono,
  EditTraining: Editing,
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: InitialNavigator,
    },
    MyModal: {
      screen: FinishTraining,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
