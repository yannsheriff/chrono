import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 130,
  },
  step: {
    height: 50, width: screen.widthPercent * 80, borderRadius: 15, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
});
