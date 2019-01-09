import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import Footer from './footer'
import ScreenSlider from './screenslider'
import { Auth } from '../auth'
import SignIn from '../signin'
import { Firebase } from '../firebase'
import firebase from 'firebase'

class App extends Component {

    state = {}

    constructor(props) {
        super(props)
        const fb = new Firebase()
        const auth = new Auth(fb)
        auth.fbAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        this.state = {
            firebase: fb,
            auth: auth,
        }
        console.log("App constructor")
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
        if (this.state.auth.isLoading()) {
            page = null
        } else if (this.state.auth.isAuthenticated()) {
            page = <ScreenSlider />
        } else {
            page = <SignIn auth={this.state.auth}/>
        }

        console.log("App render")

        return (
            <div>
                {errorText}
                <div className="flex-container">
                    <Header />
                </div>
                <div className="flex-container">
                    {page}
                </div>
                <div className="flex-container">
                    <Footer  auth={this.state.auth}/>
                </div>
            </div>
        )
    }
}
export default App;


