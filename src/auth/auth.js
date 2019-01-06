
const lsPrefix = 'AUTH'

class Auth {


    user = null
    loading = true
    
    constructor(firebase) {
        this.fbAuth = firebase.auth;
    }

    loadFromLocalStorage() {
        this.user = localStorage.getItem(lsPrefix + 'user');
    }

    saveToLocalStorage() {
        localStorage.setItem(lsPrefix + 'user', this.user);
    }

    authStateChanged(user) {
        this.user = user
        this.loading = false
        this.saveToLocalStorage()
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
        this.fbAuth.signOut()
    }

    isLoading() {
        return this.loading
    }

}

export { Auth }
