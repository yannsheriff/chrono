import { changeScreen } from '../actions/screenActions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import EditableTrainingList from '../components/EditableTrainingList'
import { View, Button } from 'react-native';



class SmartTrainingListEdition extends Component {


    render() {
        return (
            <View>
                <EditableTrainingList { ...this.props } />
                <Button
                    title={'new Training'}
                    // onPress={}
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
        changeScreen: () => {
            dispatch(changeScreen())
        }
    }
}



const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartTrainingListEdition)

export default componentContainer