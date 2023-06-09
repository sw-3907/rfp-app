import React, { useState, useEffect } from "react";
import { Box, Grid, ThemeProvider, Button, CircularProgress } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import { default as NewJobModal } from "./components/Job/NewJobModal";
import { firestore, app } from "./firebase/config";
import { Close as CloseIcon } from '@material-ui/icons';
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [customSearch, setCustomSearch] = useState(false);
const [newJobModal, setNewJobModal] = useState(false);
const [viewJobModal, setViewJobModal] = useState({});


  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
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
    setLoading(false);
  };

  const fetchJobsCustom = async (rfpSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
    .collection('rfps')
    .orderBy('postedOn', 'desc')
    .where("location", '==', rfpSearch.location)
    .where("type", '==', rfpSearch.type)
    .get();

  const tempJobs = req.docs.map((job) => ({ 
    ...job.data(), 
    id: job.id, 
    postedOn: job.data().postedOn 
  }));
  setJobs(tempJobs);
  setLoading(false);
}

  const postRFP = async rfpDetails => {
    await firestore.collection('rfps').add({
      ...rfpDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  };

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
      <NewJobModal 
        postRFP={postRFP} 
        open={openModal} 
        closeModal={handleClose} />
      <ViewJobModal 
        job={viewJobModal} 
        // closeModal={() => setViewJobModal({})}
        open={openModal} 
        closeModal={handleClose} />
      <Box my={5} >
      <Grid container justify="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom={fetchJobsCustom} />
          
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box> 
          ) : (
          <>
          {customSearch && (
          <Box my={2} display="flex" justifyCOntent="flex-end">
            <Button onClick={fetchJobs}>
              <CloseIcon size={20} />
              Reset Search
            </Button>
          </Box>
          )}
          {jobs.map((job) => (
            <JobCard open={() => setViewJobModal(job)} key={job.id} {...job} />
          ))}
        </>
          )}
        </Grid>
      </Grid>
      </Box>
    </ThemeProvider>
  );
};