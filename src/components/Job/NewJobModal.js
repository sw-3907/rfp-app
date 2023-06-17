import React, { useState } from 'react';
import { 
    Box, 
    Grid, 
    FilledInput, 
    Typography,
    Select, 
    MenuItem,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    makeStyles, 
    Button,
    IconButton,
    CircularProgress,
} from '@material-ui/core';

import { Close as CloseIcon } from '@material-ui/icons';
import skills from '../skills';

const useStyles = makeStyles((theme) => ({
    skillChipContainer: {
        width: '100%',
        overflowX: 'auto',
      },

    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        cursor: "pointer",

        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
        },
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    }
}));

const initState = {
  title: "",
  type: "Duration",
  companyName: "",
  companyUrl: "",
  location: "West Coast",
  link: "",
  description: "",
  skills: [],
};

const NewJobModal = (props) => {
const classes = useStyles();

const [ loading, setloading ] = useState(false);
const [rfpDetails, setRfpDetails] = useState(initState);
const [initialValueSelected, setInitialValueSelected] = useState(true);

const handleChange = e => {
    e.persist();
    setInitialValueSelected(false);
    setRfpDetails(oldState => ({ 
      ...oldState, 
      [e.target.name]: e.target.value 
    }));
};

const addRemoveSkill = skill => 
    rfpDetails.skills.includes(skill)
    ? setRfpDetails(oldState => ({ 
        ...oldState, 
        skills: oldState.skills.filter((s) => s !== skill ), 
    }))
    : setRfpDetails(oldState => ({ 
        ...oldState, 
        skills: oldState.skills.concat(skill), 
    }));
    
const handleSubmit = async () => {
    setloading(true);
    await props.postRFP(rfpDetails);
    setloading(false);
    closeModal();
};

const closeModal = () => {
    setRfpDetails(initState)
    setloading(false);
    props.closeModal();
};

// const skills = [
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

    const handleClose = () => {
        props.closeModal();
    };

    return (
        <Dialog open={props.open} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post RFP
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}> 
                        <FilledInput 
                        onChange={handleChange}
                        name="title"
                        value={rfpDetails.title} 
                        placeholder="RFP title *" 
                        disableUnderline 
                        fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select 
                          onChange={handleChange}
                          name="type"
                          value={rfpDetails.type}  
                          fullWidth 
                          disableUnderline 
                          variant="filled"
                          > 
                            {initialValueSelected && (
                              <MenuItem value="Duration" disabled>
                              Duration
                              </MenuItem>
                            )}
                            <MenuItem value="2 to 4 weeks">2 to 4 weeks</MenuItem>
                            <MenuItem value="3 to 6 months">3 to 6 months</MenuItem>
                            <MenuItem value="9 to 12 months">9 to 12 months</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput  
                        onChange={handleChange}
                        name="companyName"
                        value={rfpDetails.companyName}  
                        placeholder="Org name *" 
                        disableUnderline 
                        fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput  
                        onChange={handleChange}
                        name="companyUrl"
                        value={rfpDetails.companyUrl} 
                        placeholder="Org URL *" 
                        disableUnderline 
                        fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select 
                        onChange={handleChange}
                        name="location"
                        value={rfpDetails.location} 
                        fullWidth 
                        disableUnderline 
                        variant="filled" >
                            <MenuItem value="West Coast">West Coast</MenuItem>
                            <MenuItem value="East Coast">East Coast</MenuItem>
                            <MenuItem value="Central">Central</MenuItem>
                            <MenuItem value="International">International</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name="link"
                        value={rfpDetails.link}  
                        placeholder="Link to RFP *" 
                        disableUnderline 
                        fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput  
                        onChange={handleChange}
                        name="description"
                        value={rfpDetails.description} 
                        placeholder="Job Description *" 
                        disableUnderline 
                        fullWidth 
                        multiline />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box className={classes.skillChipContainer}>
                    <Box display="flex">
                        {skills.map((skill) => (
                            <Box onClick={() => addRemoveSkill(skill)} 
                            className={`${classes.skillChip} ${rfpDetails.skills.includes(skill) && classes.included}`}
                            key={skill}
                            >
                            {skill}
                            </Box>
                        ))}
                    </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">*Required fields</Typography>
                <Button 
                  onClick={handleSubmit} 
                  variant="contained" 
                  disableElevation 
                  color="primary"
                  disabled={loading}>
                    {loading ? (<CircularProgress color="secondary" size={22} />
                    ) : (
                        "Submit RFP"
                    )}
                </Button>
            </Box>
        </DialogActions>
    </Dialog>
  )
}

export default NewJobModal