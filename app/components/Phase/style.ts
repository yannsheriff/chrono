import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';

export default StyleSheet.create({
  phase: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: screen.widthPercent * 85,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  phaseHeader: {
    height: 20,
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  repetitions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  }
});
