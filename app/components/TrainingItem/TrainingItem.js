import React, { Component } from 'react';
import {
  StyleSheet, View, Animated, Text, TouchableOpacity, TouchableWithoutFeedback, Image
} from 'react-native';
import Interactable from 'react-native-interactable';
import {
  font_bold, font, mainColor, secondColor, mainShadow
} from '../../config/style';
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
          borderRadius: 10,
        }}
        >

          <View style={{
            position: 'absolute', right: 0, height: 100, flexDirection: 'row', alignItems: 'center'
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
                  }],
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
                  style={{ height: 22, width: 17 }}
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
                  }],
                  backgroundColor: secondColor
                },
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

              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>

                <View style={{
                  height: 100,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderBottomRightRadius: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  width: '85%',
                  position: 'relative',
                  ...mainShadow
                }}
                >
                  <View style={{
                    borderColor: mainColor, borderWidth: 3, borderRadius: 50, height: 60, width: 60, justifyContent: 'center', alignItems: 'center'
                  }}
                  >
                    <Text style={{ fontFamily: font_bold, textAlign: 'center' }}>{this.props.duration}</Text>
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{
                      fontFamily: font_bold, fontSize: 18, color: secondColor, marginBottom: 5
                    }}
                    >
                      {this.props.name}

                    </Text>
                    <Text style={{
                      fontFamily: font, fontSize: 14, color: secondColor, opacity: 0.5
                    }}
                    >
                      {this.props.rounds}
                      {' '}
rounds
                    </Text>

                  </View>

                </View>
                <View style={{
                  height: 80,
                  backgroundColor: secondColor,
                  borderRadius: 9,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  width: '15%',
                }}
                >
                  <Text style={{
                    transform: [{ rotate: '90deg' }], color: 'white', position: 'absolute', bottom: 30, width: 80, left: -20, textAlign: 'center', height: 20, fontFamily: font_bold
                  }}
                  >
                    {this.props.difficulty}
                  </Text>
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
    backgroundColor: mainColor,
  },
  button: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: 'white',
    ...mainShadow
  }
});
