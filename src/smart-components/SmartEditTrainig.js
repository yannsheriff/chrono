import { changeScreen } from '../actions/screenActions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import Phase from '../components/Phase'
import DurationPicker from '../components//DurationPicker';
import { View, Text, Button, ScrollView } from 'react-native';



class SmartBoilComponent extends Component {

    constructor(props) {
        super(props)
        var isNewTraining = props.navigation.getParam("trainingIndex") !== undefined ? false : true
        var hydrateTraining = isNewTraining  
        ? {
            name : 'New training',
            phases : [
                {
                    name : 'phase 1',
                    repetitions : 1,
                    steps : [
                        {
                            name : null,
                            duration : null
                        }
                    ]
                }
            ]
        }
        : {
            ...props.trainingsState.trainings[props.navigation.getParam("trainingIndex")]
        }
        this.training = hydrateTraining
        this.state = {
            training: hydrateTraining,
        }
    }

    newPhase = () => {
        this.training.phases.push({
            name : 'phase 1',
            repetitions : 1,
            steps : [
                {
                    name : null,
                    duration : null
                }
            ]
        })
        this.setState({
            training :  this.training
        })
    }

    onPhaseUpdate (phaseId, payload) {
        console.log(phaseId, payload)
    }

    render() {


        var phases = this.state.training.phases.map( (element, index) => {
            return(
                <Phase 
                    name={element.name}
                    repetitions={element.repetitions}
                    steps={element.steps}
                    phaseDidUpdate={ payload => {
                        this.onPhaseUpdate(index, payload )
                     }}
                />
            )
        })
        return (
            <View>
                <ScrollView>
                    <Text> {this.state.training.name } </Text>
                    { phases }
                    <Button
                        title={'+'}
                        onPress={this.newPhase}
                    />
                </ScrollView>
                { this.props.pickerState.isVisible && <DurationPicker value={this.props.pickerState.value ? this.props.pickerState.value : false } /> }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        screenState: state.screenReducer,
        trainingsState: state.trainingsReducer,
        pickerState:  state.pickerReducer
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