import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class Location extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      locations: []
    }
  }

  componentWillMount() {
    this.setData()
  }

  setData = async () => {
    try {
      let userData = await AsyncStorage.getItem('user')
      let tokenData = await AsyncStorage.getItem('token')
      let user = JSON.parse(userData)
      let token = JSON.parse(tokenData)
      this.setState({
        user: user,
        token: token
      })
      this.setMyLocations()
    } catch (error) {
      alert(error)
    }
  }

  setMyLocations() {
    fetch(this.props.apiUrl + '/restricted/mylocations/' + this.state.user.id, {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          locations: responseJson
        })
      })
      .catch((error) => {
        alert(error)
      })
  }

  render() {
    const imageList = this.state.locations.map((location, i) => (
      <TouchableOpacity
        key={i + 1}
        onPress={() => Actions.myLocation({ location: location })}
      >
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + location.image }}
          style={styles.image}
        />
      </TouchableOpacity>
    ))

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageListContainer}>
          <View style={styles.imageList}>
            {imageList}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  mainContainer: {
    backgroundColor: '#fff',
    paddingTop: 0,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  imageListContainer: {
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: 125,
    height: 125
  }
})
