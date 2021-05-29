import React from "react";
import {List,ListItem} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import menus from '../../config/menu.config';

const Sidebar:React.FC = ()=>{
  return (
    <aside className='fm-sidebar'>
      
      <div className="logo-title">
        Finance Manager
      </div>

      <List component="nav" aria-label="main mailbox folders">

        {menus.map((menu,i)=>{
          const {icon:Icon} = menu;
          if(menu?.path && Icon){
            return (
              <NavLink to={menu?.path} activeClassName="active" exact key={i}>
                <ListItem button className="fm-sidebar--list">
                <Icon/>
                {menu?.name}
                </ListItem>
              </NavLink>
            )
          }else{
            return (
            <ListItem button className="fm-sidebar--list text-primary mt-1"  key={i}>
              {menu?.name}
            </ListItem>)
          }
          })}
        
       
      </List>
    </aside>
  );
}


export default Sidebar;