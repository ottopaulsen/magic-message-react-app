import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Firebase, FirebaseContext } from './firebase'
import { Auth } from './auth'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import '@fontsource/monda';
import MainPage from './main-page'

const theme = createTheme({
  typography: {
    fontFamily: ['Monda', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});

const root = createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={new Firebase()}>
        <FirebaseContext.Consumer>
          {firebase =>
            <MainPage auth={new Auth(firebase.auth)} />
          }
        </FirebaseContext.Consumer>
      </FirebaseContext.Provider>
    </ThemeProvider>
  </StyledEngineProvider>
);

serviceWorker.unregister();
