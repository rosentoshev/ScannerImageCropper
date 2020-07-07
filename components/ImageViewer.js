import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

function ImageViewer({route}) {
  const croppedImage = route.params.croppedImage;
  const imageWidth = route.params.imageWidth;
  const imageHeight = route.params.imageHeight;
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height - 100);

  console.log(imageWidth);
  console.log(imageHeight);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `data:image/jpg;base64,${croppedImage}`,
          width: responsiveScreenWidth(100),
          height: responsiveScreenHeight(86),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    height: responsiveScreenHeight(100), // 100% of Screen height
    width: responsiveScreenWidth(100), // 100% of Screen width
  },
});

export default ImageViewer;
