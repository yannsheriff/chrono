import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';
import {
  font_bold, mainColor, secondColor, grayColor
} from '../../config/style';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wrapper: {
    width: '80%',
    marginBottom: 25,
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
