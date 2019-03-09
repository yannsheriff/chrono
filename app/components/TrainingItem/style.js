import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 30,
  },
  training: {
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#A3F7B5',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    flexDirection: 'row'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    borderWidth: 0,
    textAlign: 'left',
    paddingLeft: 25
  }
});
