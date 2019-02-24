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
    fontFamily: [
      'Monda',
    ].join(','),
    useNextVariants: true,
  },
});

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

serviceWorker.unregister();


