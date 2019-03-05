//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { requestStore } from '../actions/loading'



//  Import Components
// --------------------------------------------------------------
import Router from '../Router'

class Loader extends Component {


  constructor(props) {
    super(props)
    this.state = {
       ReduxState: this.props.state,
    } 
  }

  // componentWillMount() {
  //   AsyncStorage.removeItem('saved');
  // }

  componentDidMount() {
    console.log(this.props.state)
    this.props.populateStore()
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps)
    this.setState({
      ReduxState: nextProps.state
    }, ()=> console.log(this.state.ReduxState))
  }

    render() {
      let render = this.props.state.trainingsReducer.trainings !== undefined 
      ? ( <Router /> ) 
      : ( <View><Text>loading..</Text></View> /* <Loader /> */ )
        return render
    }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */
  
const mapStateToProps = state => {
  return {
      state: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
      populateStore: () => {
        dispatch(requestStore())
      },
    }
  }

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader)

export default componentContainer