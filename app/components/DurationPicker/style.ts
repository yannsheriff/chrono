import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#f4f4f4',
    position: 'absolute',
    bottom: 50
  },
  pickersContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white'
  },
  pickerText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '46%',
  },
  picker: { flex: 1, backgroundColor: '#f4f4f4' }

});
