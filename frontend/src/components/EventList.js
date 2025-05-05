import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/search/${searchQuery}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{ ml: 1 }}
              >
                Search
              </Button>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => handleEventClick(event._id)}
            >
              {event.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {event.title}
                </Typography>
                <Chip
                  label={event.eventType}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {event.description.substring(0, 100)}...
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Time: {event.time}
                </Typography>
                <Typography variant="body2">
                  Venue: {event.venue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventList; 