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
} from '@material-ui/core';

import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
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

const NewJobModal = (props) => {
    const classes = useStyles();

const [rfpDetails, setRfpDetails] = useState({
    title: "",
    type: "Full time",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    link: "",
    description: "",
    skills: [],
});

const handleChange = e => {
    e.persist();
    setRfpDetails(oldState => ({ ...oldState, [e.target.name]: e.target.value }));
}

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
    
const handleSubmit = async (props) => {
    await props.postRFP(rfpDetails);
};

const skills = [
    "marketing",
    "graphic design",
    "social media",
    "video",
    "strategy",
    "policy",
];

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
                          defaultValue="Full time">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
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
                        variant="filled" 
                        defaultValue="Remote">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="In Office">In Office</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
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
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">*Required fields</Typography>
                <Button onClick={() => handleSubmit(props)} variant="contained" disabledElecation color="primary">Submit RFP</Button>
            </Box>
        </DialogActions>
    </Dialog>
  )
}

export default NewJobModal