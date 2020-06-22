import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
//Redux 
import { connect } from 'react-redux';
//MUI
import Card from '@material-ui/core/Card';
import { shadows } from '@material-ui/system';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
    card: {
      
        position : 'relative',
        display : 'flex',
        marginBottom: 20,
        borderColor: 'yellowgreen',
        borderRadius: 20,
        bordercolor: 'blue',
        background: '#585858',
        color: '#fff',
       
    },
    image: {
      width: 100,
      height:100,

    },
    content: {
      padding: 25,
      objectFit: 'cover',
      whiteSpace: 'pre-line',
      overflow: "hidden",
      maxWidth: 600
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

class Post extends Component {
    render() {
      dayjs.extend(relativeTime);
      const {classes,
        post: {
          body,
          createdAt,
          userImage,
          userHandle,
          postId,
          likeCount,
          commentCount
        },
        user: {
          authenticated,
          credentials: { handle }
        }
      } = this.props;
      
    const deleteButton =
    authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null;
    const profileImageStyle = {
      height: 100,
      width: 100,
      borderRadius: '50%',
      objectFit: 'cover',
      marginTop: '30%',
      marginLeft: '15%'
    };
      return (
        <Card className={classes.card} variant="outlined">
            <CardMedia
            //image={userImage}
            title="Profile image"
            className={classes.image}>
              <img src={userImage} alt="" style={profileImageStyle}/>
            </CardMedia>
            <CardContent className={classes.content}>
            <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            style={{color:'#00bcd4'}}            >
            {userHandle}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary" >
            {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            <LikeButton postId={postId} />
          <span>{likeCount} </span>
          {/* <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton> */}
         
          <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
          
          <span>{commentCount} </span>
          
          
        </CardContent>
      </Card>
    );
  }
}
  
Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });
  
  
  export default connect(mapStateToProps)(withStyles(styles)(Post));