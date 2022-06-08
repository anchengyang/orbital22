import {
    View,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { AuthTextInput, AuthPressable, FeatureImage } from '../components';
import { globalStyles } from '../styles/Styles';
import { auth, fs } from '../firebase';


const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }

const SignupScreen = () => {
    const [users, setUsers] = useState([]);
    useConstructor(() => {
        console.log(
          "Rendering screen now"
        );
        const subscriber = onSnapshot(doc(fs, 'Directory/', 'Users'), doc => {
            let persons = doc.data()
            console.log(persons)
            Object.keys(persons).forEach((username) => {
                setUsers(users => [...users, username])
            })
        })
      });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const signUpAlert = () => {
        Alert.alert(
            'Sign Up successfully completed!',
        );
    };

    const missingFieldsAlert = () => {
        Alert.alert(
            'Missing fields, please try again!',
        );
    };

    const userExistsAlert = () => {
        Alert.alert(
            'User already exists, please try again!'
        )
    }

    const usernameExistsAlert = () => {
        Alert.alert(
            "Username is taken, please choose another username!"
        )
    }

    const usernameChecker = () => {
        console.log(username)
        console.log(users)
        if (users.find(u => u == username)) {
            usernameExistsAlert();
            return;
        }
        console.log("Username not taken")
        return signUpHandler();
    }

    const signUpHandler = async () => {
        if (email.length === 0 || password.length === 0 || username.length === 0) {
            missingFieldsAlert();
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;

                // To show the user object returned
                console.log(user);

                setExists(false)
                restoreForm();
                signUpAlert();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error('[signUpHandler]', errorCode, errorMessage);
                if (errorCode == 'auth/email-already-in-use') {
                    userExistsAlert();
                }
            });
    };


    const restoreForm = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <View style = {globalStyles.container}>
                <FeatureImage />
                <View style={globalStyles.container_auth}>
                    <Text style={[globalStyles.welcomeText, globalStyles.boldText]}>
                        {`Sign up for your CoinValet Account!`}
                    </Text>
                    <AuthTextInput
                        value={email}
                        placeholder='Your Email'
                        textHandler={setEmail}
                        keyboardType='email-address'
                    />
                    <AuthTextInput
                        value={password}
                        placeholder='Your Password'
                        textHandler={setPassword}
                        secureTextEntry
                    />
                    <AuthTextInput
                        value={username}
                        placeholder='Your Unique Username'
                        textHandler={setUsername}
                    />
                    {/* <Text>{users}</Text> */}
                    <AuthPressable
                        onPressHandler={usernameChecker}
                        title={'SIGN UP'}
                    />
                </View>
                <View style ={globalStyles.blankContainer}></View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;

