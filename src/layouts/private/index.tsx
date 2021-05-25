import React from 'react';
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

interface state{
  auth:{
    authenticated:boolean
  }
}

const Private:React.FC = props => {
  const {children} = props

  /** Redux states */
  const state = useSelector((state:state)=>{
    const {auth} = state;
    const {authenticated} = auth;
    return {authenticated};
  });

  const {authenticated} = state;
  /** Redux states */


  return(
    <>
    {
      authenticated?
      <Grid container className="h-100">
        <Grid item xs={2}>
          <Sidebar/>
        </Grid>
        <Grid item xs={10}>
          <Header/>
          <div className="section-padding-2">
            {children}
          </div>
        </Grid>
      </Grid>
    :<Redirect to="/login"/>
    }
    </>
  );
}

export default Private;