
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
      showPicker : false,
      duration: props.duration,
      name: props.name
    }
  }

  componentWillReceiveProps(nextPorps) {
    if(nextPorps.pickerState.value !== this.state.duration && nextPorps.pickerState.stepId === nextPorps.id) {
      this.setState({duration: nextPorps.pickerState.value }, () => this.stepDidUpdate() )
    }
  }

  nameDidchange = (name) => {
    this.stepDidUpdate()
  }

  textChange = (name) => {
    this.setState({ name: name })
  }

  stepDidUpdate (remove) {
    if (remove === "REMOVE") {
      this.props.stepDidUpdate(false);
    } else {
      this.props.stepDidUpdate({
        name: this.state.name,
        duration: this.state.duration,
        key: this.props.id
      })
    }

   
  }

  openPicker = () => {
    if( this.props.duration ) {
      this.props.openPicker(this.props.id, this.props.duration)
    } else {
      this.props.openPicker(this.props.id)
    }
  }

 
  render() {

    return (
      <TouchableOpacity style={styles.step}
        onLongPress={() => this.stepDidUpdate("REMOVE")}
      >
          <View style={styles.titleContainer}>
            <TextInput
              style={{height: 40, borderWidth: 0, marginLeft: 15}}
              onChangeText={this.textChange}
              onEndEditing={this.nameDidchange}
              placeholder={'name'}
              value={this.state.name}
            />
          </View>
          <View style={styles.timerContainer}>
            <TouchableOpacity
              onPress={ this.openPicker }
            >
              <Text> {this.state.duration ? this.state.duration : 'choose duration'} </Text>
            </TouchableOpacity>
          </View>
      </TouchableOpacity>
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
    borderRadius: 8, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    marginBottom: 10, 
  }, 
  titleContainer: {
    flex: 0.7
  },
  timerContainer: {
    alignItems: 'center',
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
      openPicker: (id, value ) => {
          dispatch(openPicker(id, value))
      }
  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableStep)

export default componentContainer
