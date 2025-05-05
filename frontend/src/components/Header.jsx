import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  AccountCircle,
  EventNote,
  CalendarMonth,
  Notifications,
  Search
} from '@mui/icons-material';

const Header = ({ onViewModeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
      onViewModeChange(newViewMode);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          College Event Management
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
            sx={{ mr: 2 }}
          >
            <ToggleButton value="list" aria-label="list view">
              <EventNote />
            </ToggleButton>
            <ToggleButton value="calendar" aria-label="calendar view">
              <CalendarMonth />
            </ToggleButton>
          </ToggleButtonGroup>

          <Tooltip title="Search">
            <IconButton color="inherit">
              <Search />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </Tooltip>

          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/events/create')}
                sx={{ mr: 2 }}
              >
                Create Event
              </Button>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/my-events')}>My Events</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 