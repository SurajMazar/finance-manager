import React from 'react';
import {Route} from 'react-router-dom'

interface routeInterface {
  layout:React.FC,
  component:React.FC,
  path:string,
  exact?:any
}


const AppRoute:React.FC<routeInterface> = props =>{

  const {
    component:Component,
    layout:Layout,
    path,
    exact
  } = props;

  return(
    <Route 
      path={path}
      render={()=>(
        <Layout>
          <Component/>
        </Layout>
      )}
        {...exact}
    />
  )
}

export default AppRoute;