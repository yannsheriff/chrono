import { changeScreen } from '../actions/screenActions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import TrainingList from '../components/trainingList'



class SmartBoilComponent extends Component {
    static navigationOptions = {
        headerMode: 'none',
    };
    render() {
        return (
            <TrainingList 
                trainings={ this.props.trainingsState.trainings } 
                navigation={ this.props.navigation }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        screenState: state.screenReducer,
        trainingsState: state.trainingsReducer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        changeScreen: () => {
            dispatch(changeScreen())
        }
    }
}



const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartBoilComponent)

export default componentContainer