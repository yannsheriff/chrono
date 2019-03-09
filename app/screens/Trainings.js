import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { changeScreen } from '../redux/actions/screenActions';
import { removeTraining } from '../redux/actions/trainingsActions';
import TrainingList from '../components/trainingList';


class Trainings extends Component {
    static navigationOptions = {
      headerMode: 'none',
    };

    render() {
      return (
        <View>
          <Text style={styles.text}>Hey Dude, </Text>
          <Text style={{ ...styles.text, marginBottom: 30 }}>What do you want to do today ? </Text>
          <TrainingList
            trainings={this.props.trainingsState.trainings}
            navigation={this.props.navigation}
            onTrainingDeletionRequest={id => this.props.removeTraining(id)}
          />
        </View>
      );
    }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const styles = StyleSheet.create({
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25
  }
});


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
  }
});


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trainings);

export default componentContainer;
