import React, { Component } from 'react'
import {
  AsyncStorage
} from 'react-native'
import {
  Router,
  Stack,
  Scene,
  Drawer
} from 'react-native-router-flux'
import Map from './src/Map'
import LocationForm from './src/LocationForm'
import Location from './src/Location'
import LoginForm from './src/LoginForm'
import DrawerContent from './src/DrawerContent'

export default class App extends Component {

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={LoginForm} title="ログイン" />
          <Drawer
            key="drawer"
            // drawerImage={() => (<Image/>)} // デフォルトのハンバーガーメニューを差し替える
            // drawerIcon={() => (<Icon/>)} // デフォルトのハンバーガーメニューを差し替える
            drawerWidth={300}
            contentComponent={DrawerContent}
          >
            <Scene key="map" component={Map} title="Map" />
            <Scene key="newLocation" component={LocationForm} title="新規投稿" />
            <Scene key="Location" component={Location} />
          </Drawer>
        </Stack>
      </Router>
    )
  }
}
