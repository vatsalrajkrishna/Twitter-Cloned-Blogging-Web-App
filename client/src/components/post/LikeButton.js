import React, { Component } from 'react'
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
//Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export class LikeButton extends Component {
    likedPost = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.postId === this.props.postId
          )
        )
          return true;
        else return false;
      };
      likePost = () => {
        this.props.likePost(this.props.postId);
      };
      unlikePost = () => {
        this.props.unlikePost(this.props.postId);
      };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
          ) : this.likedPost() ? (
            <MyButton tip="Undo like" onClick={this.unlikePost}>
              <FavoriteIcon color="secondary" />
            </MyButton>
          ) : (
            <MyButton tip="Like" onClick={this.likePost}>
            <FavoriteBorder color="primary" />
          </MyButton>
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps= {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
