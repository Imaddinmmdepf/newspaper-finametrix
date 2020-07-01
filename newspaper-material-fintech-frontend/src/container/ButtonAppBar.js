import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';
import PostNew from "../components/PostNew";

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
};

export default function ButtonAppBar() {

  return (
    <React.Fragment>
    <AppBar position="sticky" elevation={0}>
    <Typography
      variant="h4"
      align="center">
      NewsPaper Finametrix
    </Typography>
  </AppBar>
  </React.Fragment>
  );
}

