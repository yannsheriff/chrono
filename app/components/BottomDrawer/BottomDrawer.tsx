import React, { Component } from 'react';
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  PanResponderInstance,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';

import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  /**
   * Height of the drawer.
   */
  containerHeight: number;
  /**
   * Set to true to have the drawer start in up position.
   */
  startUp?: boolean;
  /**
   * The amount of offset to apply to the drawer's position.
   * If the app uses a header and tab navigation, offset should equal
   * the sum of those two components' heights.
   */
  offset?: number;
  /**
   * How much the drawer's down display falls beneath the up display.
   * Ex: if set to 20, the down display will be 20 points underneath the up display.
   */
  downDisplay?: number;
  /**
   * The background color of the drawer.
   */
  backgroundColor?: string;
  /**
   * Set to true to give the top of the drawer rounded edges.
   */
  roundedEdges?: string;
  /**
   * Set to true to give the drawer a shadow.
   */
  shadow?: boolean;
}

export default class BottomDrawer extends Component<Props> {
  static defaultProps = {
    offset: 0,
    startUp: true,
    backgroundColor: '#ffffff',
    roundedEdges: true,
    shadow: true,
  };

  TOGGLE_THRESHOLD: number;
  DOWN_DISPLAY: number;
  UP_POSITION: { x: number; y: number };
  DOWN_POSITION: { x: number; y: number };
  position: Animated.ValueXY;
  _panResponder: PanResponderInstance;
  state: {
    currentPosition: { x: number; y: number };
  };

  constructor(props: Props) {
    super(props);

    /**
     * TOGGLE_THRESHOLD is how much the user has to swipe the drawer
     * before its position changes between up / down.
     */
    this.TOGGLE_THRESHOLD = this.props.containerHeight / 11;
    this.DOWN_DISPLAY =
      this.props.downDisplay || this.props.containerHeight / 1.5;

    /**
     * UP_POSITION and DOWN_POSITION calculate the two (x,y) values for when
     * the drawer is swiped into up position and down position.
     */
    this.UP_POSITION = {
      x: 0,
      y:
        SCREEN_HEIGHT - (this.props.containerHeight + (this.props.offset || 0)),
    };
    this.DOWN_POSITION = {
      x: 0,
      y: this.UP_POSITION.y + this.DOWN_DISPLAY,
    };

    this.state = {
      currentPosition: this.props.startUp
        ? this.UP_POSITION
        : this.DOWN_POSITION,
    };

    this.position = new Animated.ValueXY(this.state.currentPosition);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease,
    });
  }

  render() {
    return (
      <Animated.View
        style={[
          this.position.getLayout(),
          styles.animationContainer,
          styles.roundedEdges,
          {
            height: this.props.containerHeight + Math.sqrt(SCREEN_HEIGHT),
            backgroundColor: this.props.backgroundColor,
          },
        ]}
      >
        <View style={styles.responder} {...this._panResponder.panHandlers}>
          <View style={styles.indicator} />
        </View>
        {this.props.children}

        {/* <View style={{ height: Math.sqrt(SCREEN_HEIGHT), backgroundColor: this.props.backgroundColor }} /> */}
      </Animated.View>
    );
  }

  _handlePanResponderMove = (
    e: GestureResponderEvent,
    gesture: PanResponderGestureState,
  ) => {
    if (this.swipeInBounds(gesture)) {
      const pos = this.state.currentPosition.y + gesture.dy;
      this.position.setValue({ y: pos, x: 0 });
    } else {
      this.position.setValue({
        y: this.UP_POSITION.y - this.calculateEase(gesture),
        x: 0,
      });
    }
  };

  _handlePanResponderRelease = (
    e: GestureResponderEvent,
    gesture: PanResponderGestureState,
  ) => {
    const { currentPosition } = this.state;
    if (
      gesture.dy > this.TOGGLE_THRESHOLD &&
      currentPosition === this.UP_POSITION
    ) {
      this.transitionTo(this.DOWN_POSITION);
    } else if (
      gesture.dy < -this.TOGGLE_THRESHOLD &&
      currentPosition === this.DOWN_POSITION
    ) {
      this.transitionTo(this.UP_POSITION);
    } else {
      this.resetPosition();
    }
  };

  // returns true if the swipe is within the height of the drawer.
  swipeInBounds(gesture: PanResponderGestureState) {
    return this.state.currentPosition.y + gesture.dy > this.UP_POSITION.y;
  }

  // when the user swipes the drawer above its height, this calculates
  // the drawer's slowing upward ease.
  calculateEase(gesture: PanResponderGestureState) {
    return Math.min(Math.sqrt(gesture.dy * -1), Math.sqrt(SCREEN_HEIGHT));
  }

  transitionTo(position: { x: number; y: number }) {
    Animated.spring(this.position, {
      toValue: position,
      useNativeDriver: false,
    }).start();
    this.setState({ currentPosition: position });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: this.state.currentPosition,
      useNativeDriver: false,
    }).start();
  }
}
