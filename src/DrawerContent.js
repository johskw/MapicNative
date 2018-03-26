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
      <View style={styles.container}>
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
    backgroundColor: '#fff'
  },
  logoutBtnContainer : {
    alignItems: 'center',
    marginTop: 60
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
