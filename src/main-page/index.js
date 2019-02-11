import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import Footer from './footer'
import InstructionsPage from '../instructions'
import SignInPage from '../signin'
import MagicScreens from './magicscreens';
import { Offline, Online } from "react-detect-offline";

const lsPrefix = 'Magic-'
const magicServerUrl = process.env.REACT_APP_MAGIC_SERVER_URL
const getScreensUrl = magicServerUrl + '/screens?dummy=' + Date.now()

class App extends Component {

    state = {}

    constructor(props) {
        super(props)
        const screens = JSON.parse(localStorage.getItem(lsPrefix + 'screens')) || []
        this.state = {
            fetchingScreens: false,
            isAuthenticated: false,
            mustSignIn: false,
            mustShowInstructions: false,
            screens: screens,
            token: null,
        }
        console.log("App constructor")

    }

    componentDidMount() {
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
                        this.setState({token})
                        this.fetchScreens(token)
                    })
                    .catch(error => {
                        console.log('Failed to getIdToken: ', error)
                    })
            })
        });

        console.log("App did mount.")
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        console.log('App component did catch error: ', error, info)
    }

    fetchScreens = (token) => {

        let self = this
        this.setState({ fetchingScreens: true })

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token
        }

        fetch(getScreensUrl, { headers: headers })
            .then(rsp => rsp.json())
            .then(screens => {
                self.setState({ screens: screens })
                localStorage.setItem(lsPrefix + 'screens', JSON.stringify(screens))
                self.setState({ fetchingScreens: false })
            })
            .catch(error => {
                console.log('Error fetching screens: ', error)
            })
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
            page = <MagicScreens screens={this.state.screens} />
        }

        // Decide footer part
        let footerText = ""
        if (!this.state.isAuthenticated) {
            footerText = "Authenticating..."
        } else if (this.state.fetchingScreens) {
            footerText = "Fetching screens..."
        } else if (this.state.screens.length > 0) {
            footerText = "Signed in as " + this.props.auth.getUser()
        }

        return (
            <div>
                {errorText}
                <div className="flex-container">
                    <Header />
                </div>
                <Online>
                    <div className="flex-container">
                        {page}
                    </div>
                    <div className="flex-container">
                        <Footer text={footerText} />
                    </div>
                </Online>
                <Offline>
                    <p>Your internet connection seems to be down</p>
                </Offline>
            </div>
        )
    }
}
export default App;


