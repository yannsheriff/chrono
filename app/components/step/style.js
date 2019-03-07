import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';

export default StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  step: {
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#E5F9E0',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: screen.widthPercent * 80,
    overflow: 'hidden',
    position: 'relative'
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#A3F7B5',
  }
});
