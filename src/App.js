import React, { useState, useEffect } from "react";
import { Box, Grid, ThemeProvider, Button, CircularProgress } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import MenuItems from './components/Header/MenuItems';
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
const [menuOpen, setMenuOpen] = useState(false);

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
    .where('skills', 'array-contains', rfpSearch.skill)
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

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header 
        handleOpen={handleOpen}
        handleMenuClick={handleMenuClick} />
        {menuOpen && <MenuItems onClose={handleCloseMenu} />}
      <NewJobModal 
        postRFP={postRFP} 
        open={openModal} 
        closeModal={handleClose} />
      <ViewJobModal 
        job={viewJobModal} 
        open={!!Object.keys(viewJobModal).length} 
        closeModal={() => setViewJobModal({})} />
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
          <Box my={2} display="flex" justifyContent="flex-start">
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