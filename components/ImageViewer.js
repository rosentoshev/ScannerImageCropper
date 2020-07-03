import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';

function ImageViewer({route}) {
  const croppedImage = route.params.croppedImage;
  const imageWidth = route.params.imageWidth;
  const imageHeight = route.params.imageHeight;
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height - 100);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `data:image/jpg;base64,${croppedImage}`,
          width: screenWidth,
          height: screenHeight, 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});

export default ImageViewer;
