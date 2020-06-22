import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typorgraphy from '@material-ui/core/Typography';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    bordercolor: 'blue',
    background: '#585858',
    color: '#fff',
    borderColor: 'yellowgreen',
        borderRadius: 6,
    display: 'flex',
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,

  },
  image: {
    minWidth: 50
  },
  content: {
    padding: 5,
    objectFit: 'cover'
  }
};

class Users extends Component {
  render() {
    const {
      classes,
      user: {
        bio,
        createdAt,
        imageUrl,
        handle,
        userId
      }
    } = this.props;
    const profileImageStyle = {
        height: 50,
        width: 50,
        borderRadius: '50%',
        objectFit: 'cover',
        marginTop: '3%',
        marginLeft: '3%',
        marginLeft: '3%',
        marginBottom: '3%'
      };
    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
          className={classes.image}
          title="Profile image"
          style={profileImageStyle}
        />
        <CardContent class={classes.content}>
          <Typorgraphy
            variant="h6"
            component={Link}
            to={`/users/${handle}`}
            color="primary"
          >
            {handle}
          </Typorgraphy>
          
          <Typography variant="body2">{bio}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Users);