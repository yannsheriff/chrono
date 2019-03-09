import React, { Component } from 'react';
import {
  StyleSheet, View, Animated, Text
} from 'react-native';
import Interactable from 'react-native-interactable';

export default class IconDrawer extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }

  onDrawerSnap(event) {
    const snapPointId = event.nativeEvent.id;
    console.log(`drawer state is ${snapPointId}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          //   backgroundColor: '#32B76C',
          width: '80%',
          borderRadius: 10
        }}
        >

          <View style={{
            position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center'
          }}
          >
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
                ]}
            />
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
                ]}
            />
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
                ]}
            />
          </View>

          <Interactable.View
            horizontalOnly
            snapPoints={[{ x: 0, id: 'closed' }, { x: -230, id: 'open' }]}
            onSnap={this.onDrawerSnap}
            animatedValueX={this._deltaX}
          >
            <View style={{
              height: 75, backgroundColor: '#e0e0e0', borderRadius: 10, flexDirection: 'row'
            }}
            >
              <View style={{ backgroundColor: 'red', borderRadius: 50 }}>
                <Text>11min</Text>
              </View>
              <View>
                <Text>Les belles fesses</Text>
                <Text>8 séquences</Text>
              </View>

            </View>
          </Interactable.View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
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
