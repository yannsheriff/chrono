import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    step: {
      flexDirection: 'row',
      height: 60, 
      width: '100%',
      borderRadius: 8, 
      backgroundColor: 'white', 
      alignItems: 'center', 
      marginBottom: 10, 
    }, 
    titleContainer: {
      flex: 0.7
    },
    timerContainer: {
      alignItems: 'center',
      flex: 0.3
    }
  });