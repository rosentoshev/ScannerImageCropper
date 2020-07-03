'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomCrop from 'react-native-perspective-image-cropper';
import ImagePicker from 'react-native-image-crop-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class ImageCropper extends Component {
  constructor(props) {
    super(props);
    const {route} = props;
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;

    const DEFAULT_IMAGE_HEIGHT = 3264;
    const DEFAULT_IMAGE_WIDTH = 2448;

    this.state = {
      image: '',
      initialImage: route.params.imageParam,
      rectangleCoordinates: route.params.rectangleCoordinates,
      imageWidth: DEFAULT_IMAGE_WIDTH,
      imageHeight: DEFAULT_IMAGE_HEIGHT,
    };
  }

  componentDidMount() {
    Image.getSize(this.props.route.params.imageParam, (width, height) => {
      this.setState({
        imageWidth: width,
        imageHeight: height,
      });
    });
  }

  // componentDidMount() {
  //   const {image, rectangleCoordinates} = this.props;
  //   Image.getSize(image, (width, height) => {
  //     this.setState({
  //       imageWidth: width,
  //       imageHeight: height,
  //       initialImage: image,
  //       rectangleCoordinates: rectangleCoordinates,
  //     });
  //   });
  // }

  updateImage(image, newCoordinates) {
    this.setState({
      image,
      rectangleCoordinates: newCoordinates,
    });
    if (this.state.image.length > 0) {
      console.log(this.state.image);
      this.props.navigation.navigate('Image Viewer', {
        croppedImage: this.state.image,
        imageHeight: this.state.imageHeight,
        imageWidth: this.state.imageWidth,
      });
    }
  }

  crop() {
    console.log(this.customCrop);
    this.customCrop.crop();
  }

  render() {
    console.log(this.state);
    return (
      <View>
        <CustomCrop
          updateImage={this.updateImage.bind(this)}
          rectangleCoordinates={this.state.rectangleCoordinates}
          initialImage={this.state.initialImage}
          height={this.state.imageHeight}
          width={this.state.imageWidth}
          ref={(ref) => (this.customCrop = ref)}
          overlayColor="rgba(18,190,210, 1)"
          overlayStrokeColor="rgba(20,190,210, 1)"
          handlerColor="rgba(20,150,160, 1)"
          enablePanStrict={false}
        />
        <TouchableHighlight
          style={styles.cropButtonTouchable}
          onPress={this.crop.bind(this)}>
          <View style={styles.cropButton}>
            <Text style={styles.cropButtonLabel}>Crop Image</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
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
