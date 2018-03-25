import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage
} from 'react-native'
import {
  Actions
} from 'react-native-router-flux'

export default class LocationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      token: ""
    }
  }

  componentWillMount () {
    this.setCurrentUser()
    this.currentUserCheck()
  }

  setCurrentUser = async () => {
    try {
      // let userData = await AsyncStorage.getItem('user')
      let tokenData = await AsyncStorage.getItem('token')
      // let user = JSON.parse(userData)
      let token = JSON.parse(tokenData)
      if (token !== null) {
        this.setState({
          token: token
        })
      }
    } catch (error) {
      alert(error)
    }
  }

  currentUserCheck () {
    if (this.state.token !== "") {
      Actions.drawer({ type: 'reset' })
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
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('メールアドレスまたはパスワードが間違っています')
    })
    .then((responseJson) => {
      this.saveAuthData(responseJson)
      Actions.drawer({ type: 'reset' })
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  saveAuthData (json) {
    AsyncStorage.setItem('token', JSON.stringify(json.token))
    AsyncStorage.setItem('user', JSON.stringify(json.user))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emailContainer}>
          <TextInput
            value={this.state.email}
            placeholder='メールアドレス'
            style={styles.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            value={this.state.password}
            placeholder='パスワード'
            secureTextEntry={true}
            style={styles.password}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            onPress={(e) => this.Login(e)}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center'
  },
  emailContainer: {
    marginBottom: 20,
  },
  email: {
    borderBottomWidth: 1,
    borderColor: '#ffa500',
    padding: 5,
    fontSize: 16
  },
  passwordContainer: {
    marginBottom: 20,
  },
  password: {
    borderBottomWidth: 1,
    borderColor: '#ffa500',
    padding: 5,
    fontSize: 16
  },
  loginBtnContainer: {
    marginTop: 40,
    marginBottom: 60,
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#ffa500',
    borderRadius: 2,
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16
  }
})
