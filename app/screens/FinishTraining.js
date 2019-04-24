//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <View><Text>loading..</Text></View>
    );
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  state
});


const componentContainer = connect(
  mapStateToProps
)(Loader);

export default componentContainer;
