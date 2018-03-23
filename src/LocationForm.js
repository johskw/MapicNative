import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
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
      imageData: "",
      imageUri: "",
      content: "",
      latitude: this.props.coordinate.latitude,
      longitude: this.props.coordinate.longitude
    }
  }

  selectImage (e) {
    let options = {
      title: '画像選択',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        alert('画像を選択できません')
      }
      else {
        this.setState({
          imageData: response.data,
          imageUri: 'data:image/jpeg;base64,' + response.data,
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
        image: this.state.imageData,
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

  renderImage() {
    return (
      <Image
        source={{ uri: this.state.imageUri }}
        style={{ width: 400, height: 400 }}
      />
    )
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
        <TouchableOpacity onPress={(e) => this.selectImage(e)}>
          <Text>画像を選択</Text>
        </TouchableOpacity>
        {this.state.imageUri !== "" && this.renderImage()}
        <TouchableOpacity onPress={(e) => this.postLocation(e)}>
          <Text>投稿</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
