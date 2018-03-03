import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
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
      markers: [{ "id": 17, "title": "タイトル1111", "content": "内容1", "image": "img1.png", "latitude": 35.1, "longitude": 140.1, "created_at": "2018-02-20T11:21:30Z", "updated_at": "2018-02-24T17:22:00Z" }]
    }
  }

  componentWillMount () {
    this.setMarkers()
  }

  setMarkers() {
    fetch('http://172.20.10.4:2828/locations')
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
          <TouchableOpacity onPress={() => { Actions.newLocation() }}>
            <Text>ここに投稿する</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    )
  }

  render () {
    const markerList = this.state.markers.map((marker, i) => (
      <Marker
        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        key={i + 1}
      >
        <Callout>
          <Text>{marker.title}</Text>
        </Callout>
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
});
