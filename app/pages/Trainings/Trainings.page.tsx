import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { NavigationStackProp } from 'react-navigation-stack';
import TrainingList from '~/components/trainingList';
import { mainColor, secondColor } from '~/config/style';
import { icons } from '~/assets/img';
import { Training } from '~/components/trainingList/trainingList.component';

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    height: '100%',
  },
  contentContainer: {
    paddingTop: '15%',
    paddingBottom: '27%',
  },
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25,
  },
  textWithMarginBot: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25,
    marginBottom: 30,
  },
  add: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: secondColor,
    position: 'absolute',
    bottom: '5%',
    right: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addText: {
    height: 24,
    width: 24,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },
});

interface Props {
  trainings: Training[];
  navigation: NavigationStackProp;
  newTraining: (training: Training) => unknown;
  removeTraining: (id: number) => unknown;
  requestNewTraining: () => unknown;
}

const Trainings: React.FunctionComponent<Props> = ({
  trainings,
  navigation,
  removeTraining,
  newTraining,
  requestNewTraining,
}): JSX.Element => (
  <View>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.text}>Hey Dude, </Text>
      <Text style={styles.textWithMarginBot}>
        What do you want to do today ?{' '}
      </Text>
      <TrainingList
        trainings={trainings}
        navigation={navigation}
        onTrainingDeletionRequest={(id): unknown => removeTraining(id)}
        onNewTrainingRequest={(training): void => {
          newTraining(training);
          navigation.navigate('EditTraining');
        }}
      />
    </ScrollView>

    <LinearGradient
      colors={['rgba(255, 203, 24, 0)', '#ffcb18']}
      style={styles.gradient}
    />
    <TouchableOpacity
      style={styles.add}
      onPress={(): void => {
        requestNewTraining();
        navigation.navigate('EditTraining');
      }}
    >
      <Image style={styles.addText} source={icons.add} />
    </TouchableOpacity>
  </View>
);

export default Trainings;
