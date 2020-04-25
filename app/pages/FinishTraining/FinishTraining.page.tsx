//  Import Modules
// --------------------------------------------------------------
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
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
