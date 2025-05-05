import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Paper } from '@mui/material';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarEvents = events.map(event => ({
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    allDay: false,
    resource: event
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
  };

  return (
    <Box sx={{ height: '80vh', mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Event Calendar
        </Typography>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day']}
          defaultView="month"
          popup
        />
      </Paper>
    </Box>
  );
};

export default EventCalendar; 