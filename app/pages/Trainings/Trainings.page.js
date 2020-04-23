import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TrainingList from '../../components/trainingList';
import { mainColor, secondColor } from '../../config/style';
import { icons } from '../../assets/img';

export default function Trainings({
  trainingsState,
  navigation,
  removeTraining,
  newTraining,
}) {
  navigationOptions = {
    header: null,
  };

  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: mainColor,
          height: '100%',
        }}
        contentContainerStyle={{
          paddingTop: '15%',
          paddingBottom: '27%',
        }}
      >
        <Text style={styles.text}>Hey Dude, </Text>
        <Text
          style={{
            ...styles.text,
            marginBottom: 30,
          }}
        >
          What do you want to do today ?{' '}
        </Text>
        <TrainingList
          trainings={trainingsState.trainings}
          navigation={navigation}
          onTrainingDeletionRequest={id => removeTraining(id)}
          onNewTrainingRequest={training => newTraining(training)}
        />
      </ScrollView>

      <LinearGradient
        colors={['rgba(255, 203, 24, 0)', '#ffcb18']}
        style={styles.gradient}
      />
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('EditTraining')}
      >
        <Image style={styles.addText} source={icons.add} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25,
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
