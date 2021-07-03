import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import AuthorProfile from './AuthorProfile';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(1),
      '&:hover':{
          cursor: 'pointer',
          backgroundColor: '#ddd'
      }
    }
  }));

function OneComment(props){

    const classes = useStyles();

    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const date=new Date(props.comment.dateOfComment);

    return(
        <>
                <div style={{display: 'flex', padding: '0 5px'}}>
                    <AuthorProfile uid={props.comment.uid} />
                    <div style={{display: 'flex', flexDirection: 'column', 
                    textAlign: 'left', width: '-webkit-fill-available',marginLeft: '5px'}}>
                        <div style={{display: 'flex'}}><Link to={`/profile/${props.comment.uid}`}><span style={{color: 'rgba(0,0,0,0.6)', fontWeight: '700'}}>{props.comment.commentAuthor}</span></Link>
                        <span style={{marginLeft: '8px', color: 'rgba(0,0,0,0.5)'}}>{date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()} 
                        at {date.getHours()+":"+date.getMinutes()}</span></div>
                        <p style={{marginLeft: '0px',fontStyle: 'Source Sans Pro, sans-serif'}}>{props.comment.comment}</p>
                        <span style={{color: 'blue', fontWeight: 'bold', cursor: 'default'}} 
                        onClick={()=>props.setSelectedComment(props.comment._id)}>View Reply</span>
                    </div>
                    {props.uid===props.comment.uid?<i class="fa fa-ellipsis-v" aria-hidden="true" style={{paddingRight: '10px'}} onClick={handleClick}></i>:<></>}
                    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Tooltip title="Delete"><Typography hover className={classes.typography} onClick={()=>{handleClose();props.toggleDeleteModal(props.comment._id)}}>Delete</Typography></Tooltip>
      </Popover>
                </div>
                <hr />
                </>
    );
}

export default OneComment;