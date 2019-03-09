import React, { Component } from 'react';
import {
  StyleSheet, View, Animated, Text, TouchableOpacity, TouchableWithoutFeedback, Image
} from 'react-native';
import Interactable from 'react-native-interactable';
import { font_bold, font, mainColor } from '../../config/style';
import { icons } from '../../assets/img';

export default class IconDrawer extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
    this.interactable = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isDragging) {
      this.interactable.snapTo({ index: 0 });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
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
            >
              <TouchableOpacity
                style={{
                  height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
                }}
                onPress={() => { this.props.onDuplicate(); }}
              >
                <Image
                  source={icons.duplicate}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </Animated.View>
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
            >
              <TouchableOpacity
                style={{
                  height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
                }}
                onPress={() => { this.props.onDelete(); }}
              >
                <Image
                  source={icons.trash}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </Animated.View>
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
            >
              <TouchableOpacity
                style={{
                  height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
                }}
                onPress={() => { this.props.onEdit(); }}
              >
                <Image
                  source={icons.edit}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Interactable.View
            horizontalOnly
            snapPoints={[{ x: 0, id: 'closed' }, { x: -230, id: 'open' }]}
            onSnap={this.onDrawerSnap}
            animatedValueX={this._deltaX}
            onDrag={this.props.onDrag}
            ref={ref => this.interactable = ref}
          >
            <TouchableWithoutFeedback onPress={() => { this.props.onOpen(); }}>

              <View style={{
                height: 100, backgroundColor: '#e0e0e0', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20
              }}
              >
                <View style={{
                  borderColor: mainColor, borderWidth: 3, borderRadius: 50, height: 60, width: 60, justifyContent: 'center', alignItems: 'center'
                }}
                >
                  <Text style={{ fontFamily: font_bold }}>{this.props.duration}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontFamily: font_bold }}>{this.props.name}</Text>
                  <Text style={{ fontFamily: font }}>8 séquences</Text>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </Interactable.View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: '#EE2C38'
  }
});
