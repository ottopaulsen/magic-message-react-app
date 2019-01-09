
const lsPrefix = 'AUTH'

class Auth {


    user = null
    loading = true

    constructor(firebase) {
        this.fbAuth = firebase.auth;
        // this.loadFromLocalStorage()
        // if (this.user) {
        //         this.loading = false
        // }
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
        // user.getIdToken().then((token) => {
        //     console.log("Got id token: ", token, user)
        // })
        this.user = user
        this.loading = false
        this.saveToLocalStorage()
        // this.loadFromLocalStorage()
        console.log("Auth state changed. User: ", user)
    }

    getUser = () => {
        if (this.user) {
            return this.user.displayName
        } else {
            return 'Not logged in'
        }
    }



    isAuthenticated = () => {
        return !!this.user
    }

    signOut = () => {
        console.log("signOut")
        this.clearFromLocalStorage()
        this.fbAuth.signOut()
    }

    isLoading = () => {
        return this.loading
    }

}

export { Auth }
