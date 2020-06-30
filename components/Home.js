import * as React from 'react';
import {View, Text, Button} from 'react-native';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Image Cropping"
        onPress={() => console.log('Image Crop')}
      />
    </View>
  );
}

export default HomeScreen;
