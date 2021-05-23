import React from 'react';
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';

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
      children:
      <Redirect to="/login"/>
    }
    </>
  );
}

export default Private;