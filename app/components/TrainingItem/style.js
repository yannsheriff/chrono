// React
import { StyleSheet } from 'react-native';

// config
import {
  font_bold,
  font,
  mainColor,
  secondColor,
  mainShadow
} from '../../config/style';


// ----------------------------------------------------------------------------------

export default StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColor,
  },
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25
  },
  cardWrapper: {
    width: '80%',
    borderRadius: 10,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: 'white',
    ...mainShadow
  },
  buttonWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
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
  },
  timeContainer: {
    borderColor: mainColor,
    borderWidth: 3,
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeText: {
    fontFamily: font_bold,
    textAlign: 'center'
  },
  name: {
    fontFamily: font_bold,
    fontSize: 18,
    color: secondColor,
    marginBottom: 5
  },
  rounds: {
    fontFamily: font,
    fontSize: 14,
    color: secondColor,
    opacity: 0.5
  },
  label: {
    height: 80,
    backgroundColor: secondColor,
    borderRadius: 9,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    width: '15%',
  },
  labelText: {
    transform: [{ rotate: '90deg' }],
    color: 'white',
    position: 'absolute',
    bottom: 30,
    width: 80,
    left: -20,
    textAlign: 'center',
    height: 20,
    fontFamily: font_bold
  }
});
