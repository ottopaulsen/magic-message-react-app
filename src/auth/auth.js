
const lsPrefix = 'AUTH'

class Auth {


    user = null
    loading = true
    
    constructor(firebase) {
        this.fbAuth = firebase.auth;
        this.loadFromLocalStorage()
    }

    loadFromLocalStorage = () => {
        this.user = JSON.parse(localStorage.getItem(lsPrefix + 'user'));
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
        console.log("isAuthenticated: ", !!this.user)
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
