import { connect } from 'react-redux';
import React from 'react';
import { View, Button, Text } from 'react-native';
import EditableTrainingList from '../components/EditableTrainingList';
import { removeTraining } from '../redux/actions/trainingsActions';


function EditableList(props) {
  return (
    <View>
      <Text style={{
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        borderWidth: 0,
        alignSelf: 'flex-start',
        paddingLeft: 25
      }}
      >
        {' '}
Trainings
        {' '}

      </Text>
      <EditableTrainingList
        trainings={props.trainingsState.trainings}
        navigation={props.navigation}
        onTrainingDeletionRequest={id => props.removeTraining(id)}
      />
      <Button
        title="new Training"
        onPress={() => props.navigation.navigate('EditTraining')}
      />
    </View>
  );
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  screenState: state.screenReducer,
  trainingsState: state.trainingsReducer
});


const mapDispatchToProps = dispatch => ({
  removeTraining: (id) => {
    dispatch(removeTraining(id));
  }
});


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableList);

export default componentContainer;
