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
        if (this.user) {
            return true
        } else {
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
        return !!this.getUser()
    }

    signOut = () => {
        this.clearFromLocalStorage()
        this.fbAuth().signOut()
    }

    isLoading = () => {
        return this.loading
    }

    fbAuth = () => {
        return this.firebaseAuth
    }
}

export { Auth }
