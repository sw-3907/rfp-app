import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'white',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(2),
  },
}));

const MenuItems = ({ onClose }) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <Box className={classes.root}>
      <IconButton className={classes.closeButton} edge="end" 
        color="inherit" aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>

      <List className={classes.list}>
        <ListItem button className={classes.listItem}>
          <ListItemText primary="Product" />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemText primary="Pricing" />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemText primary="Log In" />
        </ListItem>
      </List>

      <Box textAlign="center" py={2}>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default MenuItems;
