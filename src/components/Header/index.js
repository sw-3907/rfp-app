import React from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import HamburgerMenu from './HamburgerMenu';

const Header = (props) => (
  <Box py={5} bgcolor="secondary.main" color="white">
    <Grid container justify="center">
      <Grid item xs={10}>
        <Box display="flex" 
          justifyContent="space-between" 
          alignItems="center">
          <Typography variant="h4">RFP on Demand</Typography>
          <Box display="flex" alignItems="center">
            <Button style={{ marginRight: '10px' }} 
              variant="contained" 
              color="primary" 
              onClick={props.handleOpen}>
              Get Started
            </Button>
            <HamburgerMenu onClick={props.handleMenuClick} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Header;