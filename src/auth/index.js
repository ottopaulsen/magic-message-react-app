import React from 'react';
import firebase from '../firebase';


class Auth {

    user = null
    fbAuth = firebase.auth()

    authStateChanged(user) {
        this.user = user
        console.log("Auth state changed. User: ", user)
    }

    getUser() {
        if (this.user) {
            return this.user.displayName
        } else {
            return 'Not logged in'
        }
    }

    isAuthenticated() {
        console.log("isAuthenticated: ", !!this.user)
        return !!this.user
    }

    signOut() {
        console.log("signOut")
        firebase.auth().signOut()
    }

}

// const auth = new Auth()

const AuthContext = React.createContext(null);

export { Auth, AuthContext }
