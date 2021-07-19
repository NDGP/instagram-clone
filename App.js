import env from './config/env';

//react/react-native/react-redux
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

//firebase
import firebase from 'firebase';

//screens
import LandingScreen from './components/auth/LandingScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import MainScreen from './components/MainScreen';
//creating redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "instagram-clone-ndgp.firebaseapp.com",
  projectId: "instagram-clone-ndgp",
  storageBucket: "instagram-clone-ndgp.appspot.com",
  messagingSenderId: "372072698041",
  appId: env.FIREBASE_API_ID,
  measurementId: env.FIREBASE_MEASURMENT_ID
};

//firebase initialization check
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();


// <<<APP STARTS HERE>>> 

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
        <Provider store={store}>
          <MainScreen />
        </Provider>
      )
    }
  }
}

export default App


