// React
import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

// Libs
import Interactable, { IInteractableView } from 'react-native-interactable';

// config
import { secondColor } from '~/config/style';
import { icons } from '~/assets/img';
import styles from './style';

// ----------------------------------------------------------------------------------
interface Props {
  isDragging: boolean;
  rounds: number;
  duration: number;
  name: string;
  difficulty: string;
  onDuplicate: () => unknown;
  onDelete: () => unknown;
  onEdit: () => unknown;
  onDrag: () => unknown;
  onOpen: () => unknown;
}

export default class TrainingItem extends Component<Props> {
  _deltaX: Animated.Value;
  interactable: React.RefObject<IInteractableView>;

  constructor(props: Props) {
    super(props);
    this._deltaX = new Animated.Value(0);
    this.interactable = React.createRef();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.isDragging) {
      this.interactable.snapTo({ index: 0 });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardWrapper}>
          {/* Buttons container with animated opacity */}

          <View style={styles.buttonsContainer}>
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-230, -230, -180, -180],
                    outputRange: [1, 1, 0, 0],
                  }),
                  transform: [
                    {
                      scale: this._deltaX.interpolate({
                        inputRange: [-230, -230, -180, -180],
                        outputRange: [1, 1, 0.8, 0.8],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                  this.props.onDuplicate();
                }}
              >
                <Image
                  source={icons.duplicate}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-165, -165, -115, -115],
                    outputRange: [1, 1, 0, 0],
                  }),
                  transform: [
                    {
                      scale: this._deltaX.interpolate({
                        inputRange: [-165, -165, -115, -115],
                        outputRange: [1, 1, 0.8, 0.8],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                  this.props.onDelete();
                }}
              >
                <Image
                  source={icons.trash}
                  style={{
                    height: 22,
                    width: 17,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-100, -100, -50, -50],
                    outputRange: [1, 1, 0, 0],
                  }),
                  transform: [
                    {
                      scale: this._deltaX.interpolate({
                        inputRange: [-100, -100, -50, -50],
                        outputRange: [1, 1, 0.8, 0.8],
                      }),
                    },
                  ],
                  backgroundColor: secondColor,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                  this.props.onEdit();
                }}
              >
                <Image
                  source={icons.edit}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* End of Buttons container with animated opacity */}

          <Interactable.View
            horizontalOnly
            snapPoints={[{ x: 0, id: 'closed' }, { x: -230, id: 'open' }]}
            animatedValueX={this._deltaX}
            onDrag={this.props.onDrag}
            ref={ref => (this.interactable = ref)}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.onOpen();
              }}
            >
              {/* Cards  */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}
              >
                <View style={styles.card}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{this.props.duration}</Text>
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.rounds}>
                      {this.props.rounds} rounds
                    </Text>
                  </View>
                </View>
                <View style={styles.label}>
                  <Text style={styles.labelText}>{this.props.difficulty}</Text>
                </View>
              </View>

              {/* End of Cards  */}
            </TouchableWithoutFeedback>
          </Interactable.View>
        </View>
      </View>
    );
  }
}
