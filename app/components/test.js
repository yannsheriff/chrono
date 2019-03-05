import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Interactable from 'react-native-interactable';

export default class IconDrawer extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={{
            //   backgroundColor: '#32B76C', 
              width: '80%', 
              borderRadius: 10 }}>

            <View style={{position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
              <Animated.View style={
                [styles.button, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-230, -230, -180, -180],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-230, -230, -180, -180],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
              ]} />
              <Animated.View style={
                [styles.button, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-165, -165, -115, -115],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-165, -165, -115, -115],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
              ]} />
              <Animated.View style={
                [styles.button, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-100, -100, -50, -50],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-100, -100, -50, -50],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
              ]} />
            </View>

            <Interactable.View
              horizontalOnly={true}
              snapPoints={[{x: 0, id: 'closed'}, {x: -230, id: 'open'}]}
              onSnap={this.onDrawerSnap}
              animatedValueX={this._deltaX}>
              <View style={{height: 75, backgroundColor: '#e0e0e0', borderRadius: 10}} />
            </Interactable.View>

          </View>
      </View>
    );
  }
  onDrawerSnap(event) {
    const snapPointId = event.nativeEvent.id;
    console.log(`drawer state is ${snapPointId}`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: 40,
    height: 40,
    marginRight: 25,
    borderRadius: 50,
    backgroundColor: '#EE2C38'
  }
});