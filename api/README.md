# User Management API

A simple REST API for the User Management Application.

## Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /users` - Fetch all users
- `PUT /users` - Update users

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Test the API:
```bash
curl http://localhost:3000/users
```

## Deployment

This API is designed to be deployed on Render.com or similar platforms.

## Response Format

All responses follow this format:
```json
{
  "success": true,
  "data": [...],
  "message": "Description of the operation"
}
```
