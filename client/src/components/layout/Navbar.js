import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostPost from '../post/PostPost';
import '../../App.css';
import AppIcon from '../../icon.png';
import Notifications from './Notifications';
//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getUserData, getUserLogin } from '../../redux/actions/dataActions';

class Navbar extends Component {
     componentDidMount() {
        window.handle= getUserLogin(window.handle);
      }
    render() {
        const { authenticated } = this.props;
        const {
            classes,
            user: {
              credentials: { handle, createdAt, imageUrl, bio, website, location },
              loading,
             
            }
          } = this.props;
      
        return (
            <AppBar>
                 
                <Toolbar className="nav-container">
                    
                    {authenticated ? (
                    <Fragment>
                        <PostPost />
                        <Link to="/">
                            <MyButton tip="Home">
                                <HomeIcon color="primary" />
                            </MyButton>
                        </Link>
                        <img src={AppIcon} alt="Logo" />
                            <Notifications  />
                        
                        <Link to={`/profile/${handle}`}>
                            <MyButton tip="Profile">
                                <AccountCircleIcon color="primary" />
                            </MyButton>
                        </Link>
                        
                    </Fragment>
                    ): (
                    // <img src="./icon.png" alt="logo"></img>
                    <Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button> 
                        <Button color="inherit" component={Link} to="/login">LogIn</Button> 
                        <Button color="inherit" component={Link} to="/signup">SignUp</Button> 
                    </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user
  });

export default connect(mapStateToProps)(Navbar);
