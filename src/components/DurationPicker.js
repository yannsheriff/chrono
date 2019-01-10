
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Picker, 
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { updatePickerValue, closePicker } from '../actions/pickerActions'
import screen from '../helpers/ScreenSize'
import { red } from 'ansi-colors';


export class DurationPicker extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      seconds : 0,
      minutes : 0,
      hours : 0
    }

    this.seconds = []
    this.minutes = []
    this.hours = []
   
  }

  componentDidMount() {
    if(this.props.value) {
      this.setPickerValues(this.props.value)
    }

    setTimeout(() => {
      for (let index = 0; index < 60; index++) {
        this.seconds.push(index)   
      }

      for (let index = 0; index < 60; index++) {
          this.minutes.push(
            index
          )   
      }
      for (let index = 0; index < 24; index++) {
          this.hours.push(
            index
          )   
      }

      this.forceUpdate()
    }, 500)

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value) {
      this.setPickerValues(nextProps.value)
    }
  }

  setPickerValues(seconds) {
    var minutes = seconds / 60
    if (minutes > 1 ) {
      var secondLeft = seconds % 60
      var hours = minutes / 60
      if(hours > 1) {
        var minutesLeft = minutes % 60
        this.setState({
          seconds: secondLeft, 
          minutes:  Math.floor(minutesLeft),
          hours: Math.floor(hours)
        })
      } else {

        this.setState({
          seconds: secondLeft, 
          minutes: Math.floor(minutes)
        })
      }
    } else {
      this.setState({seconds: seconds})
    }
  }

  valueChange() {
    var totalDuration = this.state.seconds + (this.state.minutes * 60 ) + (this.state.hours * 3600 )
    this.props.updatePickerValue(totalDuration)
    
  }

 
  render() {
    var seconds = this.seconds.map((value, index) => {
      return (<Picker.Item label={`${index }`} value={value} />)
    })
    var minutes = this.minutes.map((value, index) => {
      return <Picker.Item label={`${index }`} value={value} />
    })
    var hours = this.hours.map((value, index) => {
      return <Picker.Item label={`${index}`} value={value} />
    })

    return (
      <View style={styles.container}>
        <View style={styles.doneStyle}>
          <Button
            title={'done'}
            onPress={()=> this.props.closePicker()}
          />
        </View>
        <View style={styles.pickersContainer}>
          <Picker
              selectedValue={this.state.hours}
              style={{ flex: 1, backgroundColor: '#f4f4f4' }}
              onValueChange={(itemValue) => this.setState({hours: itemValue}, this.valueChange)}
              >
              { hours }
          </Picker>
          <Text style={{backgroundColor: 'transparent', position: 'absolute', top : '46%', left: screen.widthPercent * 22}}>hours</Text>
          <Picker
              selectedValue={this.state.minutes}
              style={{ flex: 1, backgroundColor: '#f4f4f4' }}
              onValueChange={(itemValue) => this.setState({minutes: itemValue}, this.valueChange)}
              >
              { minutes }
          </Picker>
          <Text style={{backgroundColor: 'transparent', position: 'absolute', top : '46%', left: screen.widthPercent * 55}}>min</Text>
          <Picker
              selectedValue={this.state.seconds}
              style={{ flex: 1, backgroundColor: '#f4f4f4' }}
              onValueChange={(itemValue) => this.setState({seconds: itemValue}, this.valueChange)}
              >
              { seconds }
          </Picker>
          <Text style={{backgroundColor: 'transparent', position: 'absolute', top : '46%', left: screen.widthPercent * 89}}>sec</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexShrink : 0,
    backgroundColor: '#f4f4f4',
  },
  pickersContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white'
  },

});


const mapStateToProps = state => {
  return {
      pickerState: state.pickerReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePickerValue: (value) => {
          dispatch(updatePickerValue(value))
      },
      closePicker: () => {
          dispatch(closePicker())
      },

  }
}

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DurationPicker)

export default componentContainer


