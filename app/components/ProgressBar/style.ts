import { StyleSheet } from 'react-native';
import { mainColor } from '~/config/style';
// import screen from '~/helpers/ScreenSize';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 4,
    backgroundColor: '#edeeef',
    borderRadius: 3.5,
  },
  progressBar: {
    position: 'absolute',
    borderRadius: 3.5,
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: mainColor,
  },
});
