import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  TextInput,
  Animated,
  Keyboard,
  EmitterSubscription,
  KeyboardEvent,
} from 'react-native';
import generateID from '../../helpers/idGenerator';

import EditablePhase from '../../components/EditablePhase';
import DurationPicker from '../../components/DurationPicker';
import { Training } from '../../components/trainingList/trainingList';
import { Phase } from '../../components/EditablePhase/EditablePhase';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationScreenConfig,
  NavigationRoute,
} from 'react-navigation';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from 'react-navigation-stack/lib/typescript/src/vendor/types';

type Props = {
  updateTraining: (id: number, training: Training) => unknown;
  newTraining: (training: Training) => unknown;
  trainingsList: Array<Training>;
  navigation: NavigationStackProp;
  isPickerVisible: boolean;
  pickerValue: number;
};

export default class Editing extends Component<Props> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationScreenProp<undefined>;
  }) => {
    return {
      headerRight: <Button onPress={() => navigation.goBack()} title="save" />,
    };
  };

  trainingId: number;
  training: Training;
  keyboardHeight: Animated.Value;
  keyboardWillShowSub: EmitterSubscription;
  keyboardWillHideSub: EmitterSubscription;
  state: {
    training: Training;
  };

  constructor(props: Props) {
    super(props);

    const isNewTraining =
      props.navigation.getParam('trainingIndex') === undefined;
    this.trainingId = isNewTraining
      ? props.trainingsList.length
      : props.navigation.getParam('trainingIndex');
    const hydrateTraining = isNewTraining
      ? {
          name: 'New training',
          difficulty: 'easy',
          id: generateID(),
          phases: [
            {
              name: 'phase 1',
              repetitions: 1,
              steps: [],
            },
          ],
        }
      : {
          ...props.trainingsList[this.trainingId],
        };

    this.training = hydrateTraining;
    this.state = {
      training: hydrateTraining,
    };

    if (isNewTraining) {
      props.newTraining(hydrateTraining);
    }

    this.keyboardHeight = new Animated.Value(0);

    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isPickerVisible) {
      Animated.timing(this.keyboardHeight, {
        duration: 100,
        toValue: 250,
        useNativeDriver: false,
      }).start();
    } else if (!nextProps.isPickerVisible) {
      Animated.timing(this.keyboardHeight, {
        duration: 100,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  onPhaseUpdate(phaseId: number, payload: Phase | false) {
    if (payload) {
      this.training.phases = [
        ...this.training.phases.slice(0, phaseId),
        payload,
        ...this.training.phases.slice(phaseId + 1),
      ];
      this.updateReduxTraining();
    } else {
      this.training.phases = [
        ...this.training.phases.slice(0, phaseId),
        ...this.training.phases.slice(phaseId + 1),
      ];
      this.updateReduxTraining();
    }
  }

  newPhase = () => {
    const phaseNumber = this.training.phases.length + 1;
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const newPhase: Phase = {
      name: `phase ${phaseNumber}`,
      repetitions: 1,
      steps: [
        {
          name: 'exercice',
          duration: 30,
          key: `s-${timeStamp}`,
        },
      ],
    };
    const phases = this.training.phases.concat(newPhase);
    this.training.phases = phases;
    this.setState({
      training: this.training,
    });
  };

  keyboardWillShow = (event: KeyboardEvent) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.startCoordinates.height - 30,
      useNativeDriver: false,
    }).start();
  };

  keyboardWillHide = (event: KeyboardEvent) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  updateName = (value: string) => {
    this.training.name = value;
    this.setState({
      training: {
        ...this.training,
        name: value,
      },
    });
  };

  updateReduxTraining = () => {
    this.props.updateTraining(this.trainingId, this.training);
  };

  render() {
    const phases = this.state.training.phases.map((element, index) => (
      <EditablePhase
        name={element.name}
        repetitions={element.repetitions}
        steps={element.steps}
        key={index}
        phaseDidUpdate={payload => {
          this.onPhaseUpdate(index, payload);
        }}
      />
    ));
    return (
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <Animated.View
          style={{
            paddingBottom: this.keyboardHeight,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
            }}
            style={{ flexGrow: 2 }}
          >
            <TextInput
              value={this.state.training.name}
              onChangeText={this.updateName}
              onEndEditing={this.updateReduxTraining}
              style={{
                fontSize: 40,
                marginVertical: 20,
                fontWeight: 'bold',
                borderWidth: 0,
                alignSelf: 'flex-start',
                paddingLeft: 20,
              }}
            />
            {phases}
            <Button title="+" onPress={this.newPhase} />
          </ScrollView>
        </Animated.View>

        {this.props.isPickerVisible && (
          <DurationPicker
            value={this.props.pickerValue ? this.props.pickerValue : 0}
          />
        )}
      </View>
    );
  }
}
