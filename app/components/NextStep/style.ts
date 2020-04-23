import { StyleSheet } from 'react-native';
import { font } from '../../config/style';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  wrapper: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    width: 20,
    height: 20,
  },
  textContainer: {
    // marginLeft: 30
  },
  label: {
    fontFamily: font,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    marginBottom: 3,
  },
  text: {
    fontFamily: font,
    color: 'white',
    fontSize: 20,
  },
});
