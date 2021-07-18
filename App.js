import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import devEnvironmentVariables from './config/env'
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/LandingScreen';
import RegisterScreen from './components/auth/RegisterScreen';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: devEnvironmentVariables.FIREBASE_API_KEY,
  authDomain: "instagram-clone-ndgp.firebaseapp.com",
  projectId: "instagram-clone-ndgp",
  storageBucket: "instagram-clone-ndgp.appspot.com",
  messagingSenderId: "372072698041",
  appId: devEnvironmentVariables.FIREBASE_API_ID,
  measurementId: devEnvironmentVariables.FIREBASE_MEASURMENT_ID
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingScreen">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Logged In!</Text>
        </View>
      )
    }
  }
}

export default App


