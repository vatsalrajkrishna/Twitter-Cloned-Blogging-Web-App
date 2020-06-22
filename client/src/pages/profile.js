import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Profile from '../components/profile/Profile';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'
import { getUserData, getUserLogin } from '../redux/actions/dataActions';
import { getPosts } from '../redux/actions/dataActions';

const styles = {
    form:{
        textAlign: 'center'
    },
    Image:{
        margin: '20px auto 20px auto'
    }, 
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    TextField : {
        margin: '10px auto 10px auto'
    },
    button: {
        margin: 20,
        position : 'relative'
    },
    customError: {
        color:'blue',
        fontSize:  '0.Brem',
        marginTop : 10
    }, 
    progress: {
        position: 'absolute'
    }
}
export class profile extends Component {
    componentDidMount() {
        const handle = this.props.match.params.handle;
        this.props.getUserLogin(handle);
        console.log(this.props.getUserLogin(handle));
        axios
          .get(`/profile/${handle}`)
          .then((res) => {
            this.setState({
              profile: res.data.user
            });
          })    
          .catch((err) => console.log(err));
      }
     
    render() {
        const { posts  } = this.props.data;
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location },
              loading,
              authenticated
            }
        }=this.props;
        const postsMarkup = loading ? (
        <p>Loading your posts...</p>
        ) : posts === null ? (
        <p>No posts from this user</p>
        ) : (
        posts.map((post) => <Post key={post.postId} post={post} />)
        );
        return (
            <div container > 
                    <div item sm={8} xs={12}>
                        <Profile/>
                    </div>
                    <hr />
                    <Grid item sm={8} xs={12}>
                        {postsMarkup}
                    </Grid>
            </div>
         
           
        
        )
    }
}

profile.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };
  
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    data: state.data
});

const mapActionsToProps = {
    loginUser,
    getUserData,
    getUserLogin
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(profile))
