import React, { Component } from 'react';
import App from '../main-page'

const lsPrefix = 'AUTH'

class Auth extends Component {

    state = {
        user: null,
        loading: true,
        token: null,
        errorMessage: ''
    }

    loadFromLocalStorage = () => {
        this.user = JSON.parse(localStorage.getItem(lsPrefix + 'user'));
        console.log("Loaded user from local storage ", this.user)
    }

    saveToLocalStorage = () => {
        localStorage.setItem(lsPrefix + 'user', JSON.stringify(this.user));
    }

    clearFromLocalStorage = () => {
        localStorage.removeItem(lsPrefix + 'user');
    }

    authStateChanged = (user) => {
        this.user = user
        this.loading = false
        this.saveToLocalStorage()
    }

    idTokenChanged = (user, tokenChanged) => {
        if (user) {
            user.getIdToken()
            .then(result => {
                // this.token = result
                this.setState({
                    errorMessage: '',
                    token: result,
                })
                tokenChanged()
            })
            .catch(error => {
                this.setState({errorMessage: error.message})
                console.log('Error in getIdToken: ', error.message)
            })
        }
    }

    getUser = () => {
        if (this.user) {
            return this.user.displayName
        } else {
            return 'Not logged in'
        }
    }

    getToken = () => {
        return this.token
    }

    isAuthenticated = () => {
        return !!this.user
    }

    signOut = () => {
        console.log("signOut")
        this.clearFromLocalStorage()
        this.props.fbAuth.signOut()
    }

    isLoading = () => {
        return this.loading
    }

    fbAuth = () => {
        return this.props.fbAuth
    }

    render = () => {
        return (
            <App auth={this}/>
        )
    }
}

export { Auth }
