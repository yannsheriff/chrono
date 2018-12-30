import { removeTraining } from '../actions/trainingsActions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import EditableTrainingList from '../components/EditableTrainingList'
import { View, Button, Text } from 'react-native';




class SmartTrainingListEdition extends Component {


    render() {
        return (
            <View>
                <Text style={{fontSize: 30,
              marginTop: 20,
              fontWeight: 'bold',
              borderWidth: 0,
              alignSelf: "flex-start",
              paddingLeft: 25 }}> Trainings </Text>
                <EditableTrainingList 
                    trainings={ this.props.trainingsState.trainings } 
                    navigation={ this.props.navigation }
                    onTrainingDeletionRequest={ id => this.props.removeTraining(id)}
                />
                <Button
                    title={'new Training'}
                    onPress={() => this.props.navigation.navigate('EditTraining')}
                />
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
        removeTraining: (id) => {
            dispatch(removeTraining(id))
        }
    }
}



const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartTrainingListEdition)

export default componentContainer