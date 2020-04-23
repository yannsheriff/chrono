//  Import Modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import stats from '../data/stats';


class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingsDone: []
    };
  }

  componentDidMount() {
    const promise = stats.loadStats();
    promise.then((doneTrainings) => {
      const trainingID = this.props.navigation.getParam('trainingID', 'NO-ID');
      const trainingsDone = doneTrainings.filter(item => (item.id === trainingID));
      this.setState({ trainingsDone });
    });
  }


  render() {
    const { trainingsDone } = this.state;
    console.log('TCL: Loader -> render -> trainingsDone', trainingsDone);

    return (
      <View>
        <Text>Bravo</Text>

        <Button
          title="X"
          onPress={() => { this.props.navigation.navigate('Home'); }}
        />
        <Text>{ trainingsDone.length }</Text>
      </View>
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
