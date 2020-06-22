import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
//Redux
import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataActions'
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
const styles = (theme) => ({
    submitButton: {
      position: 'relative',
      float: 'right',
      marginTop: 10
    },
    progressSpinner: {
      position: 'absolute'
    },
    closeButton: {
      position: 'relative',
      float: 'left',
      marginTop: 10
    }
  });
class PostPost extends Component{
    state={
        open: false,
        body:'',
        errors:{}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({
            errors: nextProps.UI.errors
          });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
          this.setState({ body: '', open: false, errors: {}  });
        }
      }
    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
      this.props.clearErrors();
        this.setState({open: false, errors: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.postPost({ body: this.state.body });
      };
    render(){
        const {errors} = this.state;
        const  {classes, UI: {loading}} = this.props;
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Post!">
                    <AddIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    
                    <DialogTitle>Create new Post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField  name="body" type="text" label="Add your thought's...!!" multiline rows="3"
                             placeholder="What's new today" error={errors.body ? true : false}
                            helperText={errors.body} className={classes.textField} onChange={this.handleChange} fullWidth/>
                           
                           
                            <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading} >
                                Submit
                                {loading && (
                                <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )   
    }
}

PostPost.propTypes= {
    postPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postPost, clearErrors })(withStyles(styles)(PostPost));