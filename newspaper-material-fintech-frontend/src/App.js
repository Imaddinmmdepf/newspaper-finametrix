import React, { Fragment } from 'react';
import './App.css';
import {Provider} from "react-redux";
import PostNew from "./components/PostNew"
import { store } from './actions/store';
<<<<<<< HEAD
import {Container,  Grid} from "@material-ui/core"
=======
import {Container, Grid} from "@material-ui/core"
>>>>>>> ba7e30a72e6a4f5b4f0bee7986dad61a4ce1a1d2
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppBarLayout from './Layout/AppBarLayout';




function App() {
  return (
    <Provider store= {store}>
      <Fragment>
        <Container>
        <Grid> 
          <AppBarLayout/>
          <Router>
            <Route exact path="/" component={() => <PostNew normalPost={true}/>} />
            <Route path="/archived" component={() => <PostNew normalPost={false} />} />
          </Router>
          <ButterToast position={{vertical:POS_TOP, horizontal:POS_RIGHT}}/>
       </Grid>
       </Container>
      </Fragment>
    </Provider>

     
  );
}

export default App;
