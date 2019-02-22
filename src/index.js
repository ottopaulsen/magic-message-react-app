import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Firebase, FirebaseContext } from './firebase'
import { Auth } from './auth'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-monda';
import MainPage from './main-page'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Monda',
    ].join(','),
    useNextVariants: true,
  },
});


// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <FirebaseContext.Provider value={new Firebase()}>
      <FirebaseContext.Consumer>
        {/* {firebase => <Auth fbAuth={firebase.auth} />} */}
        {firebase =>
          <MainPage auth={new Auth(firebase.auth)} />
        }
      </FirebaseContext.Consumer>
    </FirebaseContext.Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


