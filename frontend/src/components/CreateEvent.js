import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  Avatar,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { Event, Description, Category, CalendarToday, AccessTime, Place, Image as ImageIcon, ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';

const steps = ['Event Details', 'Date & Venue', 'Image Upload'];

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    time: '',
    venue: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to create an event');
        setLoading(false);
        navigate('/login');
        return;
      }
  
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image') {
          if (formData[key]) {
            formDataToSend.append('image', formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      await axios.post('http://localhost:5000/api/events', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/events');
      }, 1200);
    } catch (error) {
      setLoading(false);
  
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('Error creating event. Please try again.');
        console.error('Error:', error);
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, boxShadow: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            Create Event
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <form onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  margin="normal"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Event color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  select
                  label="Event Type"
                  name="eventType"
                  fullWidth
                  margin="normal"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Category color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Time"
                  name="time"
                  type="time"
                  fullWidth
                  margin="normal"
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Venue"
                  name="venue"
                  fullWidth
                  margin="normal"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Place color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <Box
                  sx={{
                    border: '2px dashed #1976d2',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: '#f0f6ff',
                    mb: 2,
                    transition: 'background 0.2s',
                    '&:hover': { bgcolor: '#e3f2fd' },
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="event-image-upload"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="event-image-upload">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                      <IconButton component="span" color="primary" size="large">
                        <ImageIcon fontSize="inherit" />
                      </IconButton>
                      <Typography variant="body1" color="primary">
                        Drag & Drop or Click to Upload Image
                      </Typography>
                    </Box>
                  </label>
                  {imagePreview && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                      <Avatar src={imagePreview} alt="Event" sx={{ width: 120, height: 120, borderRadius: 3 }} />
                    </Box>
                  )}
                  {formData.image && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected: {formData.image.name}
                    </Typography>
                  )}
                </Box>
              </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                disabled={activeStep === 0 || loading}
                onClick={handleBack}
                startIcon={<ArrowBack />}
                sx={{ borderRadius: 3 }}
              >
                Back
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  sx={{ borderRadius: 3 }}
                  disabled={loading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 3 }}
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? 'Creating...' : 'Create Event'}
                </Button>
              )}
            </Box>
          </form>
          <Snackbar
            open={success}
            autoHideDuration={1200}
            onClose={() => setSuccess(false)}
            message="Event created successfully!"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateEvent; 