# User Management System

A web application for managing user data with real-time updates.

## Features

- **Dynamic User Display**: Fetches and displays users from REST API
- **Live Editing**: Edit user information using Bootstrap modals
- **No Page Refresh**: All updates happen dynamically without page reloads
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Comprehensive error handling for API failures
- **Loading States**: Visual feedback during data operations

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styling with Bootstrap integration
- **JavaScript ES6+**: Modern async/await patterns with modular structure
- **Bootstrap 5.3**: Responsive framework and components
- **Fetch API**: Modern HTTP client for API communication

## Project Structure

```
user-management-app/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Custom CSS styles
├── js/
│   ├── main.js            # Main application logic
│   └── utils/
│       ├── fetchData.js   # Data fetching utility
│       └── putData.js     # Data sending utility
└── README.md              # This file
```

## API Endpoints

- **GET** `https://easy-simple-users-rest-api.onrender.com` - Fetch all users
- **PUT** `https://easy-simple-users-rest-api.onrender.com/{userId}` - Update user

## User Data Structure

```javascript
{
  id: number,
  name: string,
  age: number,
  role: string,
  avatar_url: string
}
```

## Key Features Implementation

### Async Data Loading
- Uses modern `async/await` syntax
- Implements proper error handling with try/catch blocks
- Shows loading spinners during API calls

### Modular JavaScript
- ES6 modules with import/export syntax
- Separation of concerns with utility functions
- Clean, maintainable code structure

### Live Updates
- Dynamic DOM manipulation without page refreshes
- Real-time user interface updates
- Optimistic UI updates for better user experience

### Responsive Design
- Bootstrap grid system for responsive layout
- Mobile-friendly modal design
- Touch-friendly interface elements

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The application will automatically load user data from the API

## Browser Requirements

- Modern browser with ES6+ support
- JavaScript enabled
- Internet connection for API calls

## Development Notes

This application follows modern web development practices:
- Semantic HTML structure
- Modular JavaScript architecture
- Responsive design principles
- Accessibility considerations
- Error handling and user feedback

## Future Enhancements

- Add new user functionality
- Delete user capability
- Search and filter features
- Data validation
- Offline support
- Unit tests

---

Built following modern web development best practices with a focus on user experience and code maintainability.
