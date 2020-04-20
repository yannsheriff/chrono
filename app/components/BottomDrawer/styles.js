import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  animationContainer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
  },
  roundedEdges: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  shadow: {
    shadowColor: '#CECDCD',
    shadowRadius: 3,
    shadowOpacity: 5,
  },
  indicator: {
    width: 30,
    height: 3,
    backgroundColor: '#edeeef',
    borderRadius: 1.5,
    marginTop: 10
  },
  responder: {
    width: '100%',
    height: 40,
    alignItems: 'center'
  }
});

export default styles;
