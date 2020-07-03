import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Button, Toolbar, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "auto"

  },
  title: {
    align:"center",
    margin:'auto',

  },
  loginButton: {
    marginLeft: 'auto' 
  }

}));

export default function AppBarLayout() {
  const classes =  useStyles();
  return (
    <React.Fragment>
    
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.menuButton}>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/">
            <KeyboardBackspaceIcon />
          </IconButton>
          </Box>
          <Box className={classes.title}>
          <Typography variant="h3">
            News Finametrix
          </Typography>
          </Box>
          <Box className={classes.loginButton}>
          <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>

  </React.Fragment>
  );
}

