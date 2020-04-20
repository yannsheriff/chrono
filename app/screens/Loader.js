//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { requestStore } from '../redux/actions/loading';


//  Import Components
// --------------------------------------------------------------
import Router from '../config/Router';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReduxState: this.props.state,
    };
  }

  // componentWillMount() {
  //   AsyncStorage.removeItem('saved');
  // }

  componentDidMount() {
    console.log(this.props.state);
    this.props.populateStore();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps)
    this.setState({
      ReduxState: nextProps.state
    }, () => console.log(this.state.ReduxState));
  }

  render() {
    const render = this.props.state.trainingsReducer.trainings !== undefined
      ? (<Router />)
      : (<View><Text>loading..</Text></View> /* <Loader /> */);
    return render;
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  populateStore: () => {
    dispatch(requestStore());
  },
});

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);

export default componentContainer;
