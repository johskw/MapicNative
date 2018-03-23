import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      newMarker: {},
      markers: []
    }
  }

  componentWillMount () {
    this.setMarkers()
  }

  setMarkers() {
    fetch('http://localhost:8080/locations')
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
    this.setState({
      newMarker: {
        coordinate: e.nativeEvent.coordinate
      }
    })
  }

  renderNewMarker () {
    return(
      <Marker
        coordinate={this.state.newMarker.coordinate}
      >
        <Callout>
          <TouchableOpacity onPress={() => { Actions.newLocation({coordinate: this.state.newMarker.coordinate}) }}>
            <Text>ここに投稿する</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    )
  }

  render () {
    const markerList = this.state.markers.map((marker, i) => (
      <View key={i + 1}>
        <Marker
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          centerOffset={{x: 0, y: -30}}
        >
          <Image
            source={require('../images/marker_icon.png')}
            style={{ width: 48, height: 60 }}
          />
          <Callout>
            <TouchableOpacity onPress={() => { Actions.Location({ location: marker }) }}>
              <Text>{marker.title}</Text>
            </TouchableOpacity>
          </Callout>
        </Marker>
        <Marker
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          centerOffset={{ x: 0, y: -36 }}
        >
          <Image
            source={{ uri: 'data:image/jpeg;base64,' + marker.image }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Marker>
      </View>
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
});
