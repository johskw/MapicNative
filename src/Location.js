import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native'
import {
  Actions
} from 'react-native-router-flux'

export default class Location extends Component {

  render () {
    return(
      <View>
        <Text>
          {this.props.location.title}
        </Text>
        <Text>
          {this.props.location.content}
        </Text>
        <Text>
          {this.props.location.latitude}
        </Text>
        <Text>
          {this.props.location.longitude}
        </Text>
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.props.location.image }}
          style={{ width: 400, height: 400 }}
        />
      </View>
    )
  }
}
