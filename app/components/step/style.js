import { StyleSheet } from 'react-native';
import { font } from '../../config/style';
import screen from '../../helpers/ScreenSize';

export default StyleSheet.create({
  container: {
    width: screen.widthPercent * 80,
    justifyContent: 'center',
    marginBottom: 15
  },
  step: {
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#E5F9E0',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    position: 'relative'
  },
  progressContainer: {
    flex: 5
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  text: {
    flex: 1,
    textAlign: 'center'
  },
  name: {
    fontFamily: font,
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 5
  }
});
