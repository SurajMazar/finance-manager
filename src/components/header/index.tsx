import React from "react";
import {Menu,MenuItem,Button} from '@material-ui/core';
import { getLocalStorage } from "../../utils/localstorage.utils";
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth.service";

const Header:React.FC = ()=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // redux
  const dispatch = useDispatch();

  const Logout = ()=>{
    dispatch(logout());
  }

  return (
    <header className='fm-header'>
     <Button className="btn ml-auto" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {getLocalStorage('username') || "user"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={()=>{handleClose();Logout();}}>Logout</MenuItem>
      </Menu>
    </header>
  );
}


export default Header;