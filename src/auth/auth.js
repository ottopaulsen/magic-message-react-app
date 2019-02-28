
const lsPrefix = 'AUTH'

class Auth {

    user = null
    loading = true
    token = null
    errorMessage = ''

    constructor(fbAuth) {
        this.firebaseAuth = fbAuth
    }

    loadFromLocalStorage = () => {
        this.user = JSON.parse(localStorage.getItem(lsPrefix + 'user'));
        if(this.user){
            console.log("Loaded user from local storage ", this.user)
            return true
        } else {
            console.log("No user in local storage. Must sign in.")
            return false
        }
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

    // idTokenChanged = (user, tokenChanged) => {
    //     if (user) {
    //         user.getIdToken()
    //         .then(result => {
    //             // this.token = result
    //             this.setState({
    //                 errorMessage: '',
    //                 token: result,
    //             })
    //             tokenChanged()
    //         })
    //         .catch(error => {
    //             this.setState({errorMessage: error.message})
    //             console.log('Error in getIdToken: ', error.message)
    //         })
    //     }
    // }

    getUser = () => {
        return this.fbAuth().currentUser
    }

    userDisplayName = () => {
        if (this.user) {
            return this.user.displayName
        } else {
            return 'Not logged in'
        }
    }

    userEmail = () => {
        // return "ottpau@gmail.com"
		if (this.isAuthenticated()) {
			return this.getUser().email;
		} else {
			return 'not authenticated';
		}
	}


    getToken = () => {
        return this.token
    }

    setToken = token => {
        this.token = token
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
        return this.firebaseAuth
    }

    // render = () => {
    //     return (
    //         // <MainPage auth={this} />
    //         null
    //     )
    // }
}

export { Auth }
