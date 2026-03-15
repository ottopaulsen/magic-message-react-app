import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/home',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};

class SignInPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={this.props.auth.fbAuth()} />
            </div>
        );
    }
}

export default SignInPage
