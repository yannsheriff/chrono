import { changeScreen } from '../actions/screenActions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import Phase from '../components/Phase'
import { View, Text } from 'react-native';



class SmartBoilComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            training: props.trainingsState.trainings[props.navigation.getParam("trainingIndex")],
        }
    }

    render() {

        console.log(this.state.training)

        var phases = this.state.training.phases.map( element => {
            return(
                <Phase 
                    name={element.name}
                    repetitions={element.repetitions}
                    steps={element.steps}
                />
            )
        })
        return (
            <View>
                <Text> {this.state.training.name } </Text>
                { phases }
            </View>
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