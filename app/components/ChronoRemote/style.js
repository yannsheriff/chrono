import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';

export default StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 50
  },
  remoteContainer: {
    flexDirection: 'row',
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
