import React from 'react';
import {Switch,withRouter} from 'react-router-dom';
import routes from './routes/routes';
import AppRoute from './routes/route';

function App() {
  return (
   <Switch>
     {routes.map((route,i)=>{
       const {component,layout,path} = route;
       return(
         <AppRoute key={i} exact component={component} layout={layout} path={path}/>
       );
     })}
   </Switch>
  );
}

export default withRouter(App);
