import React, { useState } from 'react';
import {Box, Button, Select, MenuItem, makeStyles, CircularProgress } from '@material-ui/core';
import skills from '../skills';

const useStyles = makeStyles ({
    wrapper: {
        backgroundColor: "fff",
        display: "flex",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        "& > *": {
            flex: 1,
            height: "45px",
            margin: "8px",
        },
    },
})

export default props => {
//   const skills = [
//     "marketing",
//     "web design",
//     "graphic design",
//     "climate",
//     "social media",
//     "video",
//     "strategy",
//     "policy",
//     "healthcare",
//     "agriculture",
//     "public speaking",
//     "web development"
// ];
  
  const [loading, setLoading] = useState(false)

  const [rfpSearch, setRfpSearch] = useState ({
    skill: skills[0],
    location: ''
  });

  const handleChange = e => {
    e.persist();
    setRfpSearch(oldState => ({ 
      ...oldState, 
      [e.target.name]: e.target.value 
    }));
};
  
const search = async () => {
  setLoading(true);
  await props.fetchJobsCustom(rfpSearch);
  setLoading(false);
};

  const classes = useStyles ();

    return (
      <Box p={2} mb={2} className={classes.wrapper}>
        <Select onChange={handleChange} value={rfpSearch.skill} name="skill" disableUnderline variant="filled">
        {skills.map((skill) => (
          <MenuItem key={skill} value={skill}>{skill}</MenuItem>
        ))}
      </Select>
        <Select onChange={handleChange} value={rfpSearch.location} name="location"  disableUnderline variant="filled">
          <MenuItem value="West Coast">West Coast</MenuItem>
          <MenuItem value="East Coast">East Coast</MenuItem>
          <MenuItem value="Central">Central</MenuItem>
          <MenuItem value="International">International</MenuItem>
        </Select>
        <Button 
        disabled={loading}
        variant="contained" 
        color="primary" 
        disableElevation
        onClick={search}>  
        {loading ? (<CircularProgress color="secondary" size={22} />
        ) : (
            "Search RFP"
        )}</Button>
      </Box>
    );
}