import React from 'react';
import { IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const HamburgerMenu = ({ onClick }) => {
  return (
    <IconButton 
      color="inherit" 
      aria-label="menu" 
      onClick={onClick}>
        <MenuIcon />
    </IconButton>
  );
};

export default HamburgerMenu;
