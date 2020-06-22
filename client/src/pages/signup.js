import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../icon.png';   
import { Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions' 
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import Linked from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
//MUI Styles
import { makeStyles } from '@material-ui/core/styles';
//MUI Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const styles = {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    Image:{
      margin: '20px auto 20px auto'
  }, 
    avatar: {
     
      backgroundColor: '#292929'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    
    },
    submit: {
      margin: (3, 0, 2),
    },
    button: {
      margin: 20,
      position : 'relative'
  },
  customError: {
      color:'red',
      fontSize:  '0.Brem',
      marginTop : 10
  }, 
  progress: {
      position: 'absolute'
  },
  TextField : {
    margin: '10px auto 10px auto'
  },
  
  '& label.Mui-focused': {
    color: 'white',
  },
  
  input: {
    color: "white"
  },
  floatingLabelFocusStyle: {
    color: "grey"
  },
  notchedOutline: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    '&:hover': {
        borderColor: '#FFFFFF',
        borderWidth: 2
    },
  }
  
  };

  
function Copyright() {
    return (
      <Typography variant="body2" color="#fff" align="center">
        {'Copyright © '}
        <Linked color="inherit" href="http://tecnosols.com/">
          Tecnosols
        </Linked>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export class signup extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors :{}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }


    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }; 
        this.props.signupUser(newUserData, this.props.history);
    };
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <img src={AppIcon} alt="Login" className={classes.Image}/>
                    <Typography component="h1" variant="h4" color="#fff">
                        CREATE ACCOUNT
                    </Typography>
                    <form noValidate className={classes.root} onSubmit={this.handleSubmit}>
                        <TextField id="handle" name="handle" type="text" label="User Name" autoComplete="User Name"
                            autoFocus className={classes.TextField} variant="outlined" margin="normal" 
                              InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                              }}
                        helperText={errors.handle} error={errors.handle ? true : false} value={this.state.handle} 
                        onChange={this.handleChange} fullWidth/>
                        <TextField id="email" name="email" type="email" label="Email" autoComplete="Email"
                            autoFocus className={classes.TextField} variant="outlined" margin="normal" 
                              InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                              }}
                        helperText={errors.email} error={errors.email ? true : false} value={this.state.email}
                        onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" autoComplete="Password"
                            autoFocus className={classes.TextField} variant="outlined" margin="normal" 
                              InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                              }} 
                        helperText={errors.password} error={errors.password ? true : false} value={this.state.password} 
                        onChange={this.handleChange} fullWidth/>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" autoComplete="Confirm Password"
                            autoFocus className={classes.TextField} variant="outlined" margin="normal" 
                              InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                              }} 
                        helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} value={this.state.confirmPassword} 
                        onChange={this.handleChange} fullWidth/>
                        <br />
                    <center>

                        {errors.general  &&(
                            <Typography variant="body" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            SIGNUP{loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                    </center>
                        <br /> 
                        <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
                
              </Link>
              </Grid>
              <Grid item>
                <Linked href="/login" variant="body2">
                Already have an account? Login 
                </Linked>
              </Grid>
            </Grid>
                    </form>
                    </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
                
        )
    }
}
signup.propTypes={
    classes: PropTypes.object.isRequired,
    user: PropTypes.func.isRequired,
    UI: PropTypes.func.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))
