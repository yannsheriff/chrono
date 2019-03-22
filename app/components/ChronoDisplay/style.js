import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';
import {
  font_bold, mainColor, secondColor, grayColor
} from '../../config/style';

export default StyleSheet.create({
  container: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wrapper: {
    width: '80%',
    marginBottom: 45,
  },
  round: {
    height: 210,
    width: 210,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b2226',
    shadowColor: 'rgba(8, 18, 28, 0.8)',
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 10,
  },
  borderContainer: {
    position: 'absolute',
    left: -30,
    top: -30
  },
  name: {
    fontSize: 18,
    fontFamily: font_bold,
    textTransform: 'capitalize',
    color: secondColor,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: 'row'
  },
  doneTime: {
    color: mainColor,
    fontSize: 24,
    fontFamily: font_bold,
  },
  time: {
    fontSize: 24,
    fontFamily: font_bold,
    color: grayColor,
    marginBottom: 10,
  }
});
