import React, {useEffect, useRef, useState} from 'react';
import CustomCrop from 'react-native-perspective-image-cropper';
import {Image, View, TouchableHighlight, Text, StyleSheet} from 'react-native';

function ImageEditor({image, rectangleCoordinates}) {
  const customCrop = useRef(null);
  const [photo, setPhoto] = useState({});
  const [imageWidth, setImageWidth] = useState({});
  const [imageHeight, setImageHeight] = useState({});
  const [newRectangleCoordinates, setNewRectangleCoordinates] = useState({});
  const [initialImage, setInitialImage] = useState({});
  const DEFAULT_IMAGE_HEIGHT = 3264;
  const DEFAULT_IMAGE_WIDTH = 2448;

  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setImageWidth(width),
        setImageHeight(height),
        setInitialImage(image),
        setNewRectangleCoordinates(rectangleCoordinates);
    });
  }, []);

  function updateImage(photo, newCoordinates) {
    setPhoto(photo);
    setNewRectangleCoordinates({
      topLeft: {
        x: customCrop.current.state.topLeft.x._value,
        y: customCrop.current.state.topLeft.y._value,
      },
      topRight: {
        x: customCrop.current.state.topRight.x._value,
        y: customCrop.current.state.topRight.y._value,
      },
      bottomRight: {
        x: customCrop.current.state.bottomRight.x._value,
        y: customCrop.current.state.bottomRight.y._value,
      },
      bottomLeft: {
        x: customCrop.current.state.bottomLeft.x._value,
        y: customCrop.current.state.bottomLeft.y._value,
      },
    });
  }

  function crop() {
    // setNewRectangleCoordinates({
    //   topLeft: {
    //     x: customCrop.current.state.topLeft.x._value,
    //     y: customCrop.current.state.topLeft.y._value,
    //   },
    //   topRight: {
    //     x: customCrop.current.state.topRight.x._value,
    //     y: customCrop.current.state.topRight.y._value,
    //   },
    //   bottomRight: {
    //     x: customCrop.current.state.bottomRight.x._value,
    //     y: customCrop.current.state.bottomRight.y._value,
    //   },
    //   bottomLeft: {
    //     x: customCrop.current.state.bottomLeft.x._value,
    //     y: customCrop.current.state.bottomLeft.y._value,
    //   },
    // });
    console.log(customCrop);
    customCrop.current.crop();
  }

  console.log(rectangleCoordinates);

  return (
    <View>
      <CustomCrop
        ref={customCrop}
        updateImage={updateImage}
        rectangleCoordinates={rectangleCoordinates}
        initialImage={image}
        height={DEFAULT_IMAGE_HEIGHT}
        width={DEFAULT_IMAGE_WIDTH}
        overlayColor="rgba(18,190,210, 1)"
        overlayStrokeColor="rgba(20,190,210, 1)"
        handlerColor="rgba(20,150,160, 1)"
        enablePanStrict={false}
      />
      <TouchableHighlight style={styles.cropButtonTouchable} onPress={crop}>
        <View style={styles.cropButton}>
          <Text style={styles.cropButtonLabel}>Crop</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 60,
  },
  imageCropper: {
    alignSelf: 'center',
    marginTop: 12,
  },
  cropButtonTouchable: {
    alignSelf: 'center',
    marginTop: 12,
  },
  cropButton: {
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  cropButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    color: 'white',
  },
});

export default ImageEditor;
