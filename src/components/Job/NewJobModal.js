import React from 'react';
import { 
    Box, 
    Grid, 
    Typography,
    FilledInput, 
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
}));

const skills = [
    "marketing",
    "graphic design",
    "social media",
    "video",
    "strategy",
    "policy",
];

const NewJobModal = (props) => {
    const classes = useStyles();

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
                        <FilledInput placeholder="RFP title *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select fullWidth disableUnderline variant="filled" defaultValue="Full time">
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Org name *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Org URL *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select fullWidth disableUnderline variant="filled" defaultValue="Remote">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="In Office">In Office</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Org URL *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput placeholder="Job Description *" disableUnderline fullWidth multiline />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {skills.map((skill) => (
                            <Box className={classes.skillChip} key={skill}>{skill}</Box>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">*Required fields</Typography>
                <Button variant="contained" disabledElecation color="primary">Submit RFP</Button>
            </Box>
        </DialogActions>
    </Dialog>
  )
}

export default NewJobModal