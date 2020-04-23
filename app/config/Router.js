// Libs Imports
// ----------------------------
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Scenes Imports
// ----------------------------
import Trainings from '../pages/Trainings';
import Chrono from '../pages/Chrono.js';
import Editing from '../pages/Editing';
import FinishTraining from '../pages/FinishTraining';

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
