'use strict';
import React, {Component} from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import CustomCrop from 'react-native-perspective-image-cropper';

class ImageCropper extends Component {
  componentWillMount() {
    const {route} = this.props;
    const imageProp = JSON.stringify(route.params.imageParam);
    const rectangleCoordinatesProp = JSON.stringify(
      route.params.rectangleCoordinates,
    );
    Image.getSize(imageProp, (width, height) => {
      this.setState({
        imageWidth: width,
        imageHeight: height,
        initialImage: imageProp,
        rectangleCoordinates: rectangleCoordinatesProp,
      });
    });
  }

  updateImage(image, newCoordinates) {
    this.setState({
      image,
      rectangleCoordinates: newCoordinates,
    });
  }

  crop() {
    console.log(this.customCrop);
    this.customCrop.crop();
  }

  render() {
    const {route} = this.props;
    const imageProp = route.params.imageParam;
    const rectangleCoordinatesProp = route.params.rectangleCoordinates;
    const DEFAULT_IMAGE_HEIGHT = 3264;
    const DEFAULT_IMAGE_WIDTH = 2448;

    return (
      <View>
        <CustomCrop
          updateImage={this.updateImage.bind(this)}
          rectangleCoordinates={rectangleCoordinatesProp}
          initialImage={imageProp}
          height={DEFAULT_IMAGE_HEIGHT}
          width={DEFAULT_IMAGE_WIDTH}
          ref={(ref) => {
            this.customCrop = ref;
          }}
          overlayColor="rgba(18,190,210, 1)"
          overlayStrokeColor="rgba(20,190,210, 1)"
          handlerColor="rgba(20,150,160, 1)"
          enablePanStrict={false}
        />
        <TouchableOpacity onPress={this.crop.bind(this)}>
          <Text>CROP IMAGE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default ImageCropper;
