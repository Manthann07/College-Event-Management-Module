import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-event/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  const isCreator = user && user.id === event.createdBy._id;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {event.title}
          </Typography>
          {isCreator && (
            <Box>
              <IconButton onClick={handleEdit} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => setDeleteDialogOpen(true)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Chip
          label={event.eventType}
          color="primary"
          sx={{ mb: 2 }}
        />

        {event.image && (
          <Box sx={{ mb: 3 }}>
            <img
              src={event.image}
              alt={event.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        )}

        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Time:</strong> {event.time}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Venue:</strong> {event.venue}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Created by:</strong> {event.createdBy.name}
          </Typography>
        </Box>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Event</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this event? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default EventDetails; 