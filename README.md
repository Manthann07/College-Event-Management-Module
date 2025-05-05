# College Event Management System

A comprehensive MERN stack-based College Event Management System that helps manage academic events, student participation, and administrative tasks. This system streamlines the management of college events by providing a centralized platform for administrators, faculty, and students.

## Features

### Admin Features
- Manage faculty accounts with detailed profiles
- Manage student accounts with enrollment numbers
- Create and manage events
- Handle event registrations and approvals
- Generate and manage event notices
- Profile management and password updates

### Faculty Features
- View and manage personal profile
- Create and manage events
- View student registrations
- Upload event materials
- View and respond to notices
- Update profile and credentials

### Student Features
- View personal profile and academic details
- Register for events
- View event materials
- Access event notices and announcements
- Update profile information
- Password management

## Tech Stack
- Frontend: React.js with Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Prerequisites
- Node.js
- MongoDB
- npm

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd College-Event-Management
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=mongodb://127.0.0.1:27017/college-event-management
PORT=4000
FRONTEND_API_LINK=http://localhost:3000
JWT_SECRET=YOUR_SECRET_KEY
```

4. Create a `.env` file in the frontend directory:
```
REACT_APP_APILINK=http://localhost:4000/api
```

5. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

## Project Structure
```
college-event-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── public/
└── README.md
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. 