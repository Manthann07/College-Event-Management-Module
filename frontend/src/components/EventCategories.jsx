import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';

const categories = [
  'Academic',
  'Sports',
  'Cultural',
  'Technical',
  'Workshop',
  'Seminar',
  'Conference',
  'Social'
];

const EventCategories = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
    onFilterChange({ categories: event.target.value, tags });
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setNewTag('');
      onFilterChange({ categories: selectedCategories, tags: updatedTags });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onFilterChange({ categories: selectedCategories, tags: updatedTags });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Events
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
            <Button
              variant="contained"
              onClick={handleAddTag}
              disabled={!newTag}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventCategories; 