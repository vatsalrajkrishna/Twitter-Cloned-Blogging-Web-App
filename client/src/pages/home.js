import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import PostSkeleton from '../util/PostSkeleton';
import Post from '../components/post/Post';
import UserProfile from '../components/profile/UserProfile';
//Redux
import { connect } from 'react-redux';
import Users from '../components/layout/Users'
import axios from 'axios';
import { getPosts } from '../redux/actions/dataActions';
import Typorgraphy from '@material-ui/core/Typography';

export class home extends Component {
    state = {
        users: null
      };
    componentDidMount(){
        this.props.getPosts();
        axios
            .get('/users')
            .then((res) => {
                console.log(res.data);
                this.setState({
                  users: res.data
                });
              })
              .catch((err) => console.log(err));
          }
     
        

    render() {
        
        const { posts, loading } = this.props.data;
        let recentPostsMarkup = !loading ? (
        posts.map((post) => <Post key={post.postId} post={post}/>)
        ) : <PostSkeleton />
        let recentUsersMarkup = this.state.users ? (
            this.state.users.map((user) => <Users user={user} />)
          ) : (
            <p>Loading...</p>
          );
        return ( 
            <Grid container spacing= {3} > 
                    <Grid item sm={8} xs={12}>
                        {recentPostsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <UserProfile />
                        <br />
                        <div style={{border: '1px solid grey',borderRadius: 6,} }>

                    
                        <center>
                        <Typorgraphy variant="h6" color="primary"  >
                        Find Connections
                        </Typorgraphy>
                        </center>
                       
                       {recentUsersMarkup}
                       </div>
                    
                    </Grid>
                    
                    
            </Grid>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    data:state.data
})

export default connect(mapStateToProps,{ getPosts })(home);
