import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';
import {
  font_bold, mainColor, secondColor, grayColor, font
} from '../../config/style';

export default StyleSheet.create({
  container: {
    marginTop: 180,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  name: {
    fontFamily: font,
    fontSize: 22,
    fontWeight: '500',
    color: 'white'
  },
  steps: {
    fontFamily: font,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    opacity: 0.5
  },
  timer: {
    fontSize: 56,
    fontFamily: font,
    fontWeight: '500',
    color: 'white'
  },
  round: {
    height: 210,
    width: 210,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(8, 18, 28, 0.8)',
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 10,
  },
  borderContainer: {
    position: 'absolute',
    left: -20,
    top: -20
  },
  point: {
    width: 16,
    height: 16,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  }
});
