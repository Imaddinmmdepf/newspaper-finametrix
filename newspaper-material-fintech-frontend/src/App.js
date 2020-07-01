import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import PostNew from "./components/PostNew"
import { store } from './actions/store';
import {Container, AppBar, Typography, Toolbar} from "@material-ui/core"
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ButtonAppBar from './container/ButtonAppBar'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();
  return (
    <Provider store= {store}>
     <Container maxWidth="lg">
       <ButtonAppBar />
      <Router>
        <Route exact path="/" component={() => <PostNew normalPost={true}/>} />
        <Route path="/archived" component={() => <PostNew normalPost={false} />} />
      </Router>
      <ButterToast position={{vertical:POS_TOP, horizontal:POS_RIGHT}}/>
    </Container>
    </Provider>

     
  );
}

export default App;
