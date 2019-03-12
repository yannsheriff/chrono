import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { changeScreen } from '../redux/actions/screenActions';
import { removeTraining, newTraining } from '../redux/actions/trainingsActions';
import TrainingList from '../components/trainingList';
import { mainColor, secondColor, mainShadow } from '../config/style';
import { icons } from '../assets/img';


class Trainings extends Component {
    static navigationOptions = {
      header: null
    };

    render() {
      return (
        <View>
          <ScrollView
            style={{
              backgroundColor: mainColor, height: '100%',
            }}
            contentContainerStyle={{ paddingTop: '15%' }}
          >
            <Text style={styles.text}>Hey Dude, </Text>
            <Text style={{ ...styles.text, marginBottom: 30 }}>What do you want to do today ? </Text>
            <TrainingList
              trainings={this.props.trainingsState.trainings}
              navigation={this.props.navigation}
              onTrainingDeletionRequest={id => this.props.removeTraining(id)}
              onNewTrainingRequest={training => this.props.newTraining(training)}
            />
          </ScrollView>
          <LinearGradient colors={['rgba(255, 203, 24, 0)', '#ffcb18']} style={styles.gradient} />
          <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('EditTraining')}>
            <Image style={styles.addText} source={icons.add} />
          </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25
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
    color: 'white',
    lineHeight: 50
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  }
});

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */


const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer
});


const mapDispatchToProps = dispatch => ({
  changeScreen: () => {
    dispatch(changeScreen());
  },
  removeTraining: (id) => {
    dispatch(removeTraining(id));
  },
  newTraining: (training) => {
    dispatch(newTraining(training));
  }
});


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trainings);

export default componentContainer;
