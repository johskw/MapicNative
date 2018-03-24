import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import {
  Actions
} from 'react-native-router-flux'

export default class LocationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  Login(e) {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.title,
        password: this.state.content,
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then((responseJson) => {
      AsyncStorage.setItem('token', JSON.stringify(responseJson.token))
      AsyncStorage.setItem('user', JSON.stringify(responseJson.user))
      Actions.map({ type: 'reset' })
    })
    .catch((error) => {
      alert(error)
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.emailContainer}>
          <TextInput
            value={this.state.email}
            placeholder='メールアドレス'
            style={styles.email}
            onChangeText={(text) => this.setState({ title: text })}
          />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            value={this.state.password}
            placeholder='パスワード'
            style={styles.password}
            onChangeText={(text) => this.setState({ title: text })}
          />
        </View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            onPress={(e) => this.postLocation(e)}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>投稿</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
