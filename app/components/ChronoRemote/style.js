import { StyleSheet } from 'react-native';
import screen from '../../helpers/ScreenSize';

export default StyleSheet.create({
  container: {
    marginTop: screen.heightPercent * 5,
    alignItems: 'center',
    marginBottom: screen.heightPercent * 4,
    width: '60%'
  },
  remoteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
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
  button: { margin: 20 },
  bigButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  smallButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  img: {
    width: 25,
    height: 25
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }

});
