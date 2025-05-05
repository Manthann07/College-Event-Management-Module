import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  TextField,
  Button,
  Grid,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const EventFeedback = ({ eventId, feedbacks = [] }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState(feedbacks);

  const handleSubmit = () => {
    if (rating > 0) {
      const newFeedback = {
        id: Date.now(),
        rating,
        comment,
        user: 'Current User', // Replace with actual user
        date: new Date().toISOString()
      };
      
      setSubmittedFeedbacks([newFeedback, ...submittedFeedbacks]);
      setRating(0);
      setComment('');
      
      // Here you would typically make an API call to save the feedback
      // saveFeedback(eventId, newFeedback);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Event Feedback
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography component="legend">Rate this event</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarIcon fontSize="inherit" />}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Share your experience"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        Submit Feedback
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Recent Feedback
      </Typography>

      <List>
        {submittedFeedbacks.map((feedback) => (
          <ListItem key={feedback.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{feedback.user.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography component="span" variant="subtitle1">
                    {feedback.user}
                  </Typography>
                  <Rating
                    value={feedback.rating}
                    readOnly
                    size="small"
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon fontSize="inherit" />}
                  />
                </Box>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {new Date(feedback.date).toLocaleDateString()}
                  </Typography>
                  {feedback.comment && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {feedback.comment}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EventFeedback; 