import React, { useState, useEffect } from "react";
import { Box, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import { default as NewJobModal } from "./components/Job/NewJobModal";
import { firestore, app } from "./firebase/config";

export default () => {
const [jobs, setJobs] = useState([])

  const fetchJobs = async () => {
    const req = await firestore
    .collection('rfps')
    .orderBy('postedOn', 'desc')
    .get();
  const tempJobs = req.docs.map((job) => ({ 
    ...job.data(), 
    id: job.id, 
    postedOn: job.data().postedOn 
  }));
  
    setJobs(tempJobs);
   
  };

  const postRFP = async rfpDetails => {
    await firestore.collection('rfps').add({
      ...rfpDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    })
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header handleOpen={handleOpen} />
      <NewJobModal postRFP={postRFP} open={openModal} closeModal={handleClose} />
      <Grid container justify="center">
        <Grid item xs={10}>
          <SearchBar />

          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};