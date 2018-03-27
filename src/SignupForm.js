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
      name: "",
      email: "",
      password: "",
      validationMessages: [],
      isLoading: true
    }
  }

  componentWillMount() {
    this.checkAuth()
  }

  checkAuth = async () => {
    try {
      let userData = await AsyncStorage.getItem('user')
      let tokenData = await AsyncStorage.getItem('token')
      let user = JSON.parse(userData)
      let token = JSON.parse(tokenData)
      if (token !== null && user !== null) {
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

  Signup(e) {
    if (this.validationCheck()) {
      return
    }

    fetch(this.props.apiUrl + '/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name.trim(),
        email: this.state.email.trim(),
        password: this.state.password.trim(),
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((responseJson) => {
        this.saveAuthData(responseJson)
        Actions.drawer({ type: 'reset' })
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  validationCheck () {
    let messages = []
    if (this.state.name.trim().length < 1) messages.push('ユーザー名を入力してください')
    if (this.state.name.trim().length > 20) messages.push('ユーザー名は15文字以内で入力してください')
    if (this.state.email.trim().length < 1) messages.push('メールアドレスを入力してください')
    if (this.state.password.trim().length < 6) messages.push('パスワードは6文字以上入力してください')
    this.setState({
      validationMessages: messages
    })
    return messages.length > 0
  }

  saveAuthData(json) {
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
        <View style={styles.nameContainer}>
          <TextInput
            value={this.state.name}
            placeholder='ユーザー名'
            style={styles.name}
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>
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
        <View style={styles.signupBtnContainer}>
          <TouchableOpacity
            onPress={(e) => this.Signup(e)}
            style={styles.signupBtn}
          >
            <Text style={styles.signupBtnText}>新規登録</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            onPress={() => Actions.login({type: 'reset'})}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>ログインはこちら</Text>
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
  nameContainer: {
    marginBottom: 20,
  },
  name: {
    borderBottomWidth: 1,
    borderColor: '#ffa500',
    padding: 5,
    fontSize: 16
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
  validationMessage: {
    color: '#f00'
  },
  validationMessageContainer: {
    marginBottom: 20
  },
  signupBtnContainer: {
    marginBottom: 40,
    alignItems: 'center'
  },
  signupBtn: {
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
  signupBtnText: {
    color: '#fff',
    fontSize: 16
  },
  loginBtnContainer: {
    alignItems: 'center'
  },
  loginBtn: {
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
  loginBtnText: {
    color: '#fff',
    fontSize: 16
  }
})
