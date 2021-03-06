import React, { Component } from 'react';
import './main-page.css';
import Header from './header'
import Footer from './footer'
import InstructionsPage from '../instructions'
import SignInPage from '../signin'
import MagicScreens from './magicscreens';
import { Offline, Online } from "react-detect-offline";
import MessageService from '../services/messageservice';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const lsPrefix = 'Magic-'

const styles = theme => ({
    mainPage: {
         width: 400,
    },
});

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.messageService = new MessageService(this.props.auth)
        const screens = JSON.parse(localStorage.getItem(lsPrefix + 'screens')) || []
        this.state = {
            fetchingScreens: false,
            isAuthenticated: false,
            mustSignIn: false,
            mustShowInstructions: false,
            screens: screens,
            token: null,
        }
        console.log("MainPage constructor")

    }

    componentDidMount() {
        this.setState({ mustSignIn: !this.props.auth.loadFromLocalStorage() })
        this.props.auth.fbAuth().onAuthStateChanged(user => {
            console.log('Auth state changed, user = ', user)
            const auth = this.props.auth
            auth.authStateChanged(user)
            this.setState({
                isAuthenticated: !!user,
                auth: auth,
            })
        });

        this.props.auth.fbAuth().onIdTokenChanged(user => {
            if (user) {
                console.log('Getting token')
                user.getIdToken()
                    .then(token => {
                        console.log('Got token: ', token)
                        this.setState({ token })
                        this.props.auth.setToken(token)
                        this.fetchScreens(token)
                    })
                    .catch(error => {
                        console.log('Failed to getIdToken: ', error)
                    })
            } else {
                console.log('idTokenChanged - no user')
                this.setState({ token: null })
                this.props.auth.setToken(null)
            }
        });

        console.log("MainPage did mount.")
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        console.log('MainPage component did catch error: ', error, info)
    }

    fetchScreens = (token) => {
        const self = this
        this.setState({ fetchingScreens: true })
        this.messageService.getScreens()
            .then(screens => {
                console.log('Fetched screens: ', screens)
                self.setState({
                    screens: screens,
                    fetchingScreens: false
                })
                localStorage.setItem(lsPrefix + 'screens', JSON.stringify(screens))
            })
            .catch(error => {
                console.log('Error fetching screens: ', error)
            })
    }

    signOut = () => {
        this.props.auth.signOut()
        this.setState({mustSignIn: true, isAuthenticated: false})
    }

    render = () => {

        const { classes } = this.props;


        let errorText = ""
        if (this.hasError) {
            errorText = "<div><h2>An error occured</h2></div>"
        }

        // Decide data part
        let page = <div>Blank page</div>
        console.log('State: ', this.state)
        if (this.state.mustSignIn) {
            page = <SignInPage auth={this.props.auth} />
        } else if (this.state.mustShowInstructions) {
            page = <InstructionsPage />
        } else if (this.state.screens.length > 0) {
            page = <MagicScreens
                auth={this.props.auth}
                screens={this.state.screens}
                token={this.state.token}
                messageService={this.messageService}
            />
        }

        // Decide footer part
        let footerText = ""
        if (!this.state.isAuthenticated) {
            footerText = "Authenticating..."
        } else if (this.state.fetchingScreens) {
            footerText = "Fetching screens..."
        } else if (this.state.screens.length > 0) {
            footerText = "Signed in as " + this.props.auth.userDisplayName()
        }

        return (
            <Grid container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <div className={classes.mainPage}>
                    {errorText}
                    <Header />
                    <Online>
                        {page}
                        <Footer text={footerText} signOut={this.signOut}/>
                    </Online>
                    <Offline>
                        <p>Your internet connection seems to be down</p>
                    </Offline>
                </div>
            </Grid>
        )
    }
}
export default withStyles(styles)(MainPage);


