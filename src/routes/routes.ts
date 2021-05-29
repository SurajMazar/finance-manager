import React from 'react';
import Layout from '../layouts/public/index';
import Private from '../layouts/private';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Income from '../pages/income';
import Category from '../pages/category';
import Expenses from '../pages/expenses';
import Daybook from '../pages/daybook';
import Reports from '../pages/reports';


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
  },
  {
    path:'/income',
    component:Income,
    layout:Private,
    name:'Income'
  },
  {
    path:'/category',
    component:Category,
    layout:Private,
    name:'Category'
  },
  {
    path:'/expenses',
    component:Expenses,
    layout:Private,
    name:'Expenses'
  },
  {
    path:'/daybook',
    component:Daybook,
    layout:Private,
    name:'Daybook'
  },
  {
    path:'/reports',
    component:Reports,
    layout:Private,
    name:'Reports'
  }
]


export default routes;