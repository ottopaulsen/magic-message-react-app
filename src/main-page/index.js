import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import Footer from './footer'
import InstructionsPage from '../instructions'
import { Auth } from '../auth'
import SignInPage from '../signin'
import { Firebase } from '../firebase';
import MagicScreens from './magicscreens'

const magicServerUrl = process.env.REACT_APP_MAGIC_SERVER_URL
const getScreensUrl = magicServerUrl + '/screens?dummy=' + Date.now()




class App extends Component {

    state = {}

    constructor(props) {
        super(props)
        const fb = new Firebase()
        const auth = new Auth(fb)
        this.state = {
            firebase: fb,
            auth: auth,
            isAuthenticated: false,
            mustSignIn: false,
            mustShowInstructions: false,
            screens: [],
            activeScreen: null
        }
        console.log("App constructor")
    }

    componentDidMount() {
        // this.fetchScreens()
        this.props.auth.fbAuth().onAuthStateChanged(user => {
            const auth = this.props.auth
            auth.authStateChanged(user)
            this.setState({ auth })
            this.setState({
                isAuthenticated: !!user,
            })
        });

        this.props.auth.fbAuth().onIdTokenChanged(user => {
            const auth = this.props.auth
            auth.idTokenChanged(user, () => {
                this.setState({ auth })
                user.getIdToken()
                .then(token => {
                    this.fetchScreens(token)
                })
            })
        });

        console.log("App did mount.")
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        console.log(error, info)
    }

    fetchScreens = (token) => {

        // const token = this.props.auth.getToken()

        let self = this

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token
        }

        fetch(getScreensUrl, {headers: headers})
            .then(rsp => rsp.json())
            .then(screens => {
                self.setState({screens})
                self.setDefaultScreen()
            })
    }

    setDefaultScreen = () => {
        const defaultScreen = 3
        this.setState({ activeScreen: defaultScreen })
        console.log("App setDefaultScreen")
    }

    render = () => {
        let errorText = ""
        if (this.hasError) {
            errorText = "<div><h2>An error occured</h2></div>"
        }

        // Decide data part
        let page = <div>Blank page</div>
        if (this.state.mustSignIn) {
            page = <SignInPage auth={this.props.auth} />
        } else if (this.state.mustShowInstructions) {
            page = <InstructionsPage />
        } else if (this.state.screens.length > 0) {
            page = <MagicScreens screens={this.state.screens} activeScreen={this.state.activeScreen} />
        }

        // Decide footer part
        let footerText = ""
        if (!this.state.isAuthenticated) {
            footerText = "Authenticating..."
        } else if (this.state.screens.length > 0) {
            footerText = "Signed in as " + this.props.auth.getUser()
        } else {
            footerText = "Fetching screens..."
        }

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
                    <Footer text={footerText} />
                </div>
            </div>
        )
    }
}
export default App;


