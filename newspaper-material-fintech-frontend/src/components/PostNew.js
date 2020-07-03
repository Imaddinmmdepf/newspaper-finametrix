import React, {useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/postNew';
import { Grid, Paper, withStyles, List, ListItemText, Typography, ListItem, Divider, Button } from '@material-ui/core';
import PostNewForm from './PostNewForm';
import ArchiveIcon from '@material-ui/icons/Archive';
import ButterToast, {Cinnamon} from "butter-toast";
import { AssignmentTurnedIn } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper : {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {textAlign:"center"}
});
const styleButton = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};
  const useStyles = makeStyles((theme) => ({
    markdown: {
      padding: theme.spacing(0, 3),
    },
    markDownArchivedAt: {
        padding: theme.spacing(3, 0),
    }
  }));
  

//props.classes.paper

const PostNew = ({classes, ...props}) => {

    const classesStyle = useStyles();
    const [currentId, setCurrentId] = useState(0);

    useEffect((props) => {
        if(props.normalPost) {
            props.fetchAllPostNews()
        }else{
            props.fetchAllArchivedNews()
        }
    }, []);//DidMount 
    
    const onArchive = (id) => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Rost Box"
                content = "Archived successfully"
                scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn/>}

                />
            });  
        }
        if(window.confirm('Are you sure to archive this record?'))
           
        props.archivePostNew(id, onSuccess)
    }
    const onDelete = (id) => {
        console.log("Botton de Delete");
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Rost Box"
                content = "Delete successfully"
                scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn/>}

                />
            });  
        }
         if(window.confirm('Are you sure to archive this record?'))
           
        props.deleteArchivedNew(id, onSuccess)
    }
    return (
        <Grid container>
            { props.normalPost? (
             <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <PostNewForm {...{currentId, setCurrentId}}/>
                    </Paper>
             </Grid>
            ):(
             <Grid></Grid>
            )
            }
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                { props.normalPost ? (
                <Button variant="contained" color="primary" href="/archived" style={styleButton}>
                    Archived News
                    <ArchiveIcon style={{padding: '5px'}}/>
                </Button>
                ): <div></div>}
                <List>
                    {
                        props.postNewList.map((record, index) => {
                            return(
                                <Fragment key={index}>
                                    <ListItem>
                                         <ListItemText >
                                            <Typography variant="h5">
                                                {record.title}
                                            </Typography>
                                            <Typography   style={{display: 'inline-block'}} className={classesStyle.markdown} variant="caption" display="block" gutterBottom>
                                                Content:  {record.contentType}
                                            </Typography>   
                                            <Typography  style={{display: 'inline-block' }}className={classesStyle.markdown}  variant="caption" display="block" gutterBottom>
                                                Author: {record.author}
                                            </Typography>
                                            <Typography   style={{display: 'inline-block', align:"right"}} className={classesStyle.markdown} variant="caption" display="block" gutterBottom>
                                                posted:  <Moment format="YYYY/MM/DD hh:mm:ss">{record.createdAt}</Moment>
                                            </Typography>
                                            <Divider/>
                                            <Typography>
                                                {record.description}
                                            </Typography >
                                                
                                                {
                                                    props.normalPost ? (<div></div>):(<Typography  variant="caption"  gutterBottom className={classesStyle.markDownArchivedAt}>  archivedAt: <Moment format="YYYY/MM/DD">{record.createdAt}</Moment></Typography>)
                                                }
                                            
                                            <div className={classes.actionDiv}>
                                                {props.normalPost ? (                                                
                                                    <div>
                                                    <Button variant="contained" color="primary" size="small" 
                                                    className={classes.smMargin} 
                                                    onClick={()=> setCurrentId(record._id)}>
                                                        Edit
                                                    </Button>
                                                    <Button className={classes.smMargin} 
                                                    onClick={() => onArchive(record._id)}>
                                                            <ArchiveIcon />

                                                    </Button>
                                                    </div>
                                                ):(
                                                    <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    startIcon={<DeleteIcon />}
                                                    onClick = {() => onDelete(record._id)}
                                                    >
                                                    Delete
                                                  </Button>
                                                )
                                                }
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                    <Divider component="li"/>
                                </Fragment>
                            )
                        })
                    }
                </List>
            </Paper>
        </Grid>
    </Grid>
    );
}
const mapStateToProps = state => ({
    postNewList : state.postNew.list
})

const mapActionToProps = {
    fetchAllPostNews : actions.fetchAll, 
    archivePostNew : actions.archiveNew,    
    deleteArchivedNew : actions.deleteNew,
    fetchAllArchivedNews : actions.fetchArchiveNew
}

//props.fetchAllPostNews

export default  connect(mapStateToProps,mapActionToProps)(withStyles(styles)(PostNew));
