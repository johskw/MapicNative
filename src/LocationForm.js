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
        <TextInput
          value={this.state.image}
          placeholder='画像'
          onChangeText={(text) => this.setState({ image: text })}
        />
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
