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

export default class Location extends Component {

  deleteAuthData (e) {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('user')
    Actions.login({ type: 'reset' })
  }

  render() {
    return (
      <TouchableOpacity
        onPress={(e) => this.deleteAuthData(e)}
        style={styles.logoutBtn}
      >
        <Text style={styles.loginBtnText}>ログアウト</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 0
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    height: 375,
    width: 375
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16
  },
  contentContainer: {
    marginBottom: 30
  },
  mapContainer: {
    alignItems: 'center',
    marginBottom: 100
  },
  map: {
    height: 320,
    width: 320
  }
})
