import React, { Component } from 'react'
import {
  StyleSheet,
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
import SignupForm from './src/SignupForm'
import DrawerContent from './src/DrawerContent'

export default class App extends Component {

  render() {
    return (
      <Router tintColor='#fff' navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} >
        <Scene key="root">
          <Scene key="login" component={LoginForm} hideNavBar />
          <Scene key="signup" component={SignupForm} hideNavBar />
          <Drawer
            key="drawer"
            hideNavBar
            drawerPosition='right'
            // drawerImage={() => (<Image/>)} // デフォルトのハンバーガーメニューを差し替える
            // drawerIcon={() => (<Icon/>)} // デフォルトのハンバーガーメニューを差し替える
            drawerWidth={220}
            contentComponent={DrawerContent}
          >
            <Stack>
              <Scene key="map" component={Map} title="Map" />
              <Scene key="newLocation" component={LocationForm} title="新規投稿" />
              <Scene key="Location" component={Location} />
            </Stack>
          </Drawer>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#ffa500',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15
  },
  navBarTitle: {
    color: '#fff'
  },
})
