import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import {
  Actions
} from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'

export default class LocationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      image: "",
      content: "",
      latitude: this.props.coordinate.latitude,
      longitude: this.props.coordinate.longitude
    }
  }

  selectImage (e) {
    let options = {
      title: 'Select Avatar',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      alert('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled image picker');
      }
      else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        alert('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        })
      }
    })
  }

  postLocation(e) {
    fetch('http://localhost:8080/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        image: this.state.image,
        latitude: this.state.latitude,
        longitude: this.state.longitude
      })
    })
    .then((response) => {
      if (response.ok) {
        Actions.map({ type: 'reset' })
      }
    })
    .catch((error) => {
      alert(error)
    })
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.title}
          placeholder='タイトル'
          onChangeText={(text) => this.setState({ title: text })}
        />
        <TextInput
          value={this.state.content}
          placeholder='内容'
          onChangeText={(text) => this.setState({ content: text })}
        />
        {/* <TextInput
          value={this.state.image}
          placeholder='画像'
          onChangeText={(text) => this.setState({ image: text })}
        /> */}
        <TouchableOpacity onPress={(e) => this.selectImage(e)}>
          <Text>画像を選択</Text>
        </TouchableOpacity>
        <Text>
          latitude: {this.state.latitude}
        </Text>
        <Text>
          longitude: {this.state.longitude}
        </Text>
        <TouchableOpacity onPress={(e) => this.postLocation(e)}>
          <Text>投稿</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
