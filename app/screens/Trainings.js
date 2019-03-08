import { connect } from 'react-redux';
import React, { Component } from 'react';
import { changeScreen } from '../actions/screenActions';
import TrainingList from '../components/trainingList';


class Trainings extends Component {
    static navigationOptions = {
      headerMode: 'none',
    };

    render() {
      return (
        <TrainingList
          trainings={this.props.trainingsState.trainings}
          navigation={this.props.navigation}
        />
      );
    }
}

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
  }
});


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trainings);

export default componentContainer;
