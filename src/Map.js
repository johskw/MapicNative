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
      locations: [],
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
      this.setLocations()
    } catch (error) {
      alert(error)
    }
  }

  setLocations() {
    fetch(this.props.apiUrl + '/restricted/locations', {
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
            <Text style={styles.postBtnText}>ここに投稿する</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    )
  }

  render () {
    const markerList = this.state.locations.map((location, i) => (
      <Marker
        key={i + 1}
        coordinate={{ latitude: location.latitude, longitude: location.longitude}}
        onPress={() => { Actions.Location({ location: location }) }}
        centerOffset={{x: 0, y: -35}}
      >
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + location.image }}
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
  map: { ...StyleSheet.absoluteFillObject, },
  postBtnText: {
    fontSize: 16,
    padding: 5
  }
})
