import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Grid, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditModal = ({ open, setOpen, data, handleSave }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false); // State to track saving process

  useEffect(() => {
    // Update formData when data prop changes
    setFormData(data);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    setSaving(true); // Start saving process
    try {
      await handleSave(formData); // Pass updated data to parent component
      setOpen(false); // Close the modal after saving changes
    } catch (error) {
      // Handle error
    } finally {
      setSaving(false); // End saving process
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 ,borderRadius:'10px'}}>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <h2 style={{ color: 'black' }}>Edit Data</h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField name="name" label="Name" value={formData ? formData.name : ''} fullWidth margin="normal" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="mobile" label="Mobile" value={formData ? formData.mobile : ''} fullWidth margin="normal" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="customerId" label="Customer ID" value={formData ? formData.customerId : ''} fullWidth margin="normal" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="address" label="Address" value={formData ? formData.address : ''} fullWidth margin="normal" onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSaveChanges} sx={{ marginTop: 2 }} disabled={saving}>
          {saving ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
