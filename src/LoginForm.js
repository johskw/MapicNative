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
      isLoading: true,
      validationMessages: []
    }
  }

  componentWillMount () {
    this.checkAuth()
  }

  checkAuth = async () => {
    try {
      let userData = await AsyncStorage.getItem('user')
      let tokenData = await AsyncStorage.getItem('token')
      let user = JSON.parse(userData)
      let token = JSON.parse(tokenData)
      if (token !== null && user !== null ) {
        Actions.drawer({ type: 'reset', token: token, user: user })
      } else {
        this.setState({
          isLoading: false
        })
      }
    } catch (error) {
      alert(error)
    }
  }

  Login(e) {
    fetch(this.props.apiUrl + '/login', {
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
      this.setState({
        validationMessages: [error.message]
      })
    })
  }

  saveAuthData (json) {
    AsyncStorage.setItem('token', JSON.stringify(json.token))
    AsyncStorage.setItem('user', JSON.stringify(json.user))
  }

  render() {
    if (this.state.isLoading) {
      return <View style={styles.container}></View>
    }

    const validationMessages = this.state.validationMessages.map((message, i) => (
      <Text key={i + 1} style={styles.validationMessage}>
        {message}
      </Text>
    ))

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
        <View style={styles.validationMessageContainer}>
          {validationMessages}
        </View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            onPress={(e) => this.Login(e)}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>ログイン</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupBtnContainer}>
          <TouchableOpacity
            onPress={Actions.signup}
            style={styles.signupBtn}
          >
            <Text style={styles.signupBtnText}>新規登録はこちら</Text>
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
    marginBottom: 20
  },
  password: {
    borderBottomWidth: 1,
    borderColor: '#ffa500',
    padding: 5,
    fontSize: 16
  },
  validationMessage: {
    color: '#f00'
  },
  validationMessageContainer: {
    marginBottom: 20
  },
  loginBtnContainer: {
    marginBottom: 40,
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#ffa500',
    borderRadius: 2,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16
  },
  signupBtnContainer: {
    alignItems: 'center'
  },
  signupBtn: {
    backgroundColor: '#ffc000',
    borderRadius: 2,
    width: 180,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 16
  }
})
