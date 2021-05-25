import React from "react";
import {List,ListItem} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import menus from '../../config/menu.config';

const Sidebar:React.FC = ()=>{
  return (
    <aside className='fm-sidebar'>
      <List component="nav" aria-label="main mailbox folders">

        {menus.map(menu=>{
          const {icon:Icon} = menu;
          return (
          <NavLink to={menu?.path} activeClassName="active">
            <ListItem button className="fm-sidebar--list">
            <Icon/>
            {menu?.name}
            </ListItem>
          </NavLink>
        )})}
        
       
      </List>
    </aside>
  );
}


export default Sidebar;