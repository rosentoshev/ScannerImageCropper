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
  SafeAreaView,
} from 'react-native';
import CustomCrop from 'react-native-perspective-image-cropper';
import ImagePicker from 'react-native-image-crop-picker';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container]}>
          <View style={{flex: 5}}>
            <View style={styles.imageCropper}>
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
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableHighlight
              style={styles.cropButtonTouchable}
              onPress={this.crop.bind(this)}>
              <View style={styles.cropButton}>
                <Text style={styles.cropButtonLabel}>Crop Image</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  imageCropper: {
    height: hp('100%'),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cropButtonTouchable: {
    flex: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  cropButton: {
    padding: 12,
    backgroundColor: 'blue',
    justifyContent: 'center',
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

export default ImageCropper;
