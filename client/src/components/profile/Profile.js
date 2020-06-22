import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../../util/ProfileSkeleton';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
//MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//import { IconButton } from '@material-ui/core';

const styles=(theme)=>({
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    });


class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
      };
      handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };
      handleLogout = () => {
        this.props.logoutUser();
      };
    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location },
              loading,
              authenticated
            }
        }=this.props;
        let profileMarkup = !loading ? (authenticated ? (
              <Paper className={classes.paper}>
                <Grid className={classes.profile} container spacing= {16}>
                  <Grid item className="image-wrapper" item sm={4} xs={12}>
                    <img src={imageUrl} alt="profile" className="profile-image" />
                    <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                    <MyButton tip="Edit Profile" onClick={this.handleEditPicture} btnClassName="button">
                        <AddAPhotoIcon color="primary" />
                    </MyButton>
                  </Grid>
                    <hr />
                   
                    <Grid item className="profile-details" item sm={8} xs={12}>
                        <br />
                        <EditDetails />
                        <center>
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                        <LocationOn color="primary" /> <span>{location}</span>
                        <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                        <LinkIcon color="primary" />
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {' '}
                            {website}
                        </a>
                        <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </center>
                    </Grid>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                    </MyButton>
               
                    
                </Grid>
                
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = { logoutUser, uploadImage };
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

export default connect( mapStateToProps, mapActionsToProps )(withStyles(styles)(Profile))
