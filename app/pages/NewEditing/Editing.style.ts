import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 40,
    marginVertical: 20,
    fontWeight: 'bold',
    borderWidth: 0,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  titleContainer: {
    flex: 0.7,
  },
  timerContainer: {
    alignItems: 'center',
    flex: 0.3,
  },
});
