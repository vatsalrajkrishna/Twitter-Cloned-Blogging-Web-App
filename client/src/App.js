import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions'
//Components
import Navbar from './components/layout/Navbar'; 
import AuthRoute from './util/AuthRoute.js'
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import profile from './pages/profile';
import user from './pages/user';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'FIREBASE_CLOUDFUNCTIONS_API';
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <Navbar/>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home}/>
                  <AuthRoute exacct path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/profile/:handle" component={profile} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route exact path="/users/:handle/post/:postId" component={user} />
                </Switch>
              </div>
            </Router>
        </Provider>
        
      </MuiThemeProvider>
      
    );
  }
}

export default App;
