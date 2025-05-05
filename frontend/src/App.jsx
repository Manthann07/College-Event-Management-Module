import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Grid, Paper } from '@mui/material';

// Import components
import Header from './components/Header';
import EventList from './components/EventList';
import EventCalendar from './components/EventCalendar';
import EventCategories from './components/EventCategories';
import EventFeedback from './components/EventFeedback';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import Profile from './components/Profile';
import MyEvents from './components/MyEvents';
import Login from './components/Login';
import Register from './components/Register';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({});
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    // Fetch events from API
    // fetchEvents(filter).then(setEvents);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header onViewModeChange={setViewMode} />
          
          <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <EventCategories onFilterChange={handleFilterChange} />
              </Grid>
              
              <Grid item xs={12} md={9}>
                {viewMode === 'list' ? (
                  <EventList events={events} />
                ) : (
                  <EventCalendar events={events} />
                )}
              </Grid>
            </Grid>
          </Container>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-events" element={<MyEvents />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 