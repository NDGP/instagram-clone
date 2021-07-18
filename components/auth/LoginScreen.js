import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native'
import firebase from 'firebase';
export class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.onSignup = this.onSignup.bind(this)
    }

    onSignup() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="email"
                    onChange={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChange={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignup()}
                    title='Login'
                />
            </View>
        )
    }
}

export default LoginScreen


