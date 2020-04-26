// Libs Imports
// ----------------------------
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Scenes Imports
// ----------------------------
import Trainings from './pages/Trainings';
import Chrono from './pages/Chrono';
import Editing from './pages/Editing';
import FinishTraining from './pages/FinishTraining';
import NewEditing from './pages/NewEditing';

const InitialNavigator = createStackNavigator({
  Home: {
    screen: Trainings,
    navigationOptions: {
      headerShown: false,
    },
  },
  Chrono: {
    screen: Chrono,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditTraining: NewEditing,
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
