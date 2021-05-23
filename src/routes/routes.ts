import React from 'react';
import Layout from '../layouts/public/index';
import Private from '../layouts/private';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';


interface routeInterface{
  path:string,
  name:string,
  layout:React.FC,
  component:React.FC
}


const routes:Array<routeInterface>=[
  {
    path:'/login',
    component:Login,
    layout:Layout,
    name:'Login'
  },
  {
    path:'/',
    component:Dashboard,
    layout:Private,
    name:'Dashboard'
  }
]


export default routes;