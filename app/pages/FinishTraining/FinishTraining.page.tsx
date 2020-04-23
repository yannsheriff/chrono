//  Import Modules
// --------------------------------------------------------------
import React from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  navigation: any;
}

const FinishTraining: React.FunctionComponent<Props> = ({ navigation }) => (
  <View>
    <Text>Bravo</Text>

    <Button
      title="X"
      onPress={() => {
        navigation.navigate('Home');
      }}
    />
  </View>
);

export default FinishTraining;
