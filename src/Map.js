import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      token: "",
      newMarker: {},
      markers: [],
    }
  }

  componentWillMount () {
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
      this.setMarkers()
    } catch (error) {
      alert(error)
    }
  }

  setMarkers() {
    fetch('http://localhost:8080/restricted/locations', {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        markers: responseJson
      })
    })
    .catch((error) => {
      alert(error)
    })
  }

  setNewMarker (e) {
    if (e.nativeEvent.action !== 'marker-press') {
      this.setState({
        newMarker: {
          coordinate: e.nativeEvent.coordinate
        }
      })
    }
  }

  renderNewMarker () {
    return(
      <Marker coordinate={this.state.newMarker.coordinate} >
        <Callout>
          <TouchableOpacity onPress={() => { Actions.newLocation({coordinate: this.state.newMarker.coordinate, user: this.state.user, token: this.state.token }) }}>
            <Text>ここに投稿する</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    )
  }

  render () {
    const markerList = this.state.markers.map((marker, i) => (
      <Marker
        key={i + 1}
        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        onPress={() => { Actions.Location({ location: marker }) }}
        centerOffset={{x: 0, y: -35}}
      >
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + marker.image }}
          style={{ width: 48, height: 48, borderRadius: 24, position: 'absolute', top: 4, left: 4 }}
        />
        <Image
          source={require('../images/marker_icon.png')}
          style={{ width: 56, height: 70 }}
        />
      </Marker>
    ))

    return(
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.681167,
          longitude: 139.767052,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onPress={(e) => this.setNewMarker(e)}
      >
        {this.state.newMarker.coordinate !== undefined && this.renderNewMarker()}
        {markerList}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject, }
})
