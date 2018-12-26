
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput, 
  TouchableOpacity, 
  Picker
} from 'react-native'
import { connect } from 'react-redux'
import { openPicker } from '../actions/pickerActions'
import screen from '../helpers/ScreenSize'
import { red } from 'ansi-colors';


export class EditableStep extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      showPicker : false
    }
  }

  nameDidchange = (name) => {
    this.stepDidUpdate()
  }

  textChange = (name) => {
    this.name = name
  }

  stepDidUpdate() {
    this.props.stepDidUpdate({
      name: this.name ,
      duration: this.duration,
    })
  }

  openPicker = () => {
    if( this.props.duration ) {
      this.props.openPicker(this.props.duration)
    } else {
      this.props.openPicker()
    }
  }

 
  render() {

    return (
      <View style={styles.step}>
          <View style={styles.titleContainer}>
            <TextInput
              style={{height: 40, borderWidth: 0}}
              onChangeText={this.textChange}
              onEndEditing={this.nameDidchange}
              placeholder={'name'}
              value={this.props.name}
            />
          </View>
          <View style={styles.timerContainer}>
            <TouchableOpacity
              onPress={ this.openPicker }
            >
              <Text> {this.props.duration ? this.props.duration : 'choose duration'} </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  step: {
    flexDirection: 'row',
    height: 60, 
    width: '100%',
    borderRadius: 10, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    marginBottom: 10, 
  }, 
  titleContainer: {
    flex: 0.7
  },
  timerContainer: {
    flex: 0.3
  }
});



const mapStateToProps = state => {
  return {
      pickerState: state.pickerReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
      openPicker: (value) => {
          dispatch(openPicker(value))
      }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableStep)

export default componentContainer
