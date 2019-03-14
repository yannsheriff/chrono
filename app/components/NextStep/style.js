import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';
import { font } from '../../config/style';

export default StyleSheet.create({
  container: {
    paddingHorizontal: '30%',
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10
  },
  step: {
    height: 50,
    width: screen.widthPercent * 80,
    borderRadius: 15,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  button: { margin: 20 }
});
