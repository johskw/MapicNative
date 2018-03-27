import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class DrawerContent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this.setData()
  }

  setData = async () => {
    try {
      let userData = await AsyncStorage.getItem('user')
      let user = JSON.parse(userData)
      this.setState({
        user: user,
      })
    } catch (error) {
      alert(error)
    }
  }

  deleteAuthData (e) {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('user')
    Actions.login({ type: 'reset' })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {this.state.user.name}さん
          </Text>
          <Text　style={styles.nameText}>
            でログインしています
          </Text>
        </View>
        <View style={styles.logoutBtnContainer} >
          <TouchableOpacity
            onPress={(e) => this.deleteAuthData(e)}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutBtnText}>ログアウト</Text>
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
    alignItems: 'center'
  },
  nameContainer: {
    marginTop: 80,
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    marginBottom: 10
  },
  nameText: {
    fontSize: 16
  },
  logoutBtnContainer : {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60
  },
  logoutBtn: {
    backgroundColor: '#ffa500',
    borderRadius: 2,
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 16
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16
  },
})
