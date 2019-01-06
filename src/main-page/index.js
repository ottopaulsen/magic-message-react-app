import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import Footer from './footer'
import ScreenSlider from './screenslider'
import { Auth, AuthContext } from '../auth'
import SignIn from '../signin'
import firebase from '../firebase'

class App extends Component {

    state = {}

    constructor(props) {
        super(props)
        console.log("App constructor")
        this.state = {
            auth: new Auth(firebase)
        }
    }

    componentDidMount() {
        // this.fetchScreens()
        this.state.auth.fbAuth.onAuthStateChanged(user => {
            const auth = this.state.auth
            auth.authStateChanged(user)
            this.setState({ auth })
            console.log("App did mount. User: ", user)
        });
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        console.log(error, info)
    }

    fetchScreens = () => {
        fetch('/screens.json')
          .then(rsp => rsp.json())
          .then(screens => {
            this.screens = screens
            this.setDefaultScreen()
          })
    }

    setDefaultScreen = () => {
        const defaultScreen = 3
        this.setState({ defaultScreen })
        console.log("App setDefaultScreen")
    }

    render = () => {
        let errorText = ""
        if (this.hasError) {
            errorText = "<div><h2>An error occured</h2></div>"
        }

        let page = null
        if (this.state.auth.isAuthenticated()) {
            page = <ScreenSlider />
        } else {
            page = <SignIn />
        }

        console.log("App render")

        return (
            <div>
                {errorText}
                <AuthContext.Provider value={this.state.auth}>
                    <div className="flex-container">
                        <Header />
                    </div>
                    <div className="flex-container">
                        {page}
                    </div>
                    <div className="flex-container">
                        <Footer />
                    </div>
                </AuthContext.Provider>
            </div>
        )
    }
}
export default App;


