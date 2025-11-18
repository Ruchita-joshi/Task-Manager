# Task Manager - Full Stack Application

A simple full stack web application built with Node.js Express (backend) and vanilla HTML/CSS/JavaScript (frontend). No database required - tasks are stored in memory.

## Project Structure

```
GitHUb_TaskManager/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md
```

## Features

✅ Create, Read, Update, Delete (CRUD) tasks
✅ Mark tasks as completed
✅ Real-time task statistics
✅ Simple and clean UI
✅ REST API backend
✅ CORS enabled for frontend-backend communication
✅ No database required (in-memory storage)

## Tech Stack

**Backend:**
- Node.js
- Express.js
- CORS

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript (Fetch API)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)

### Step 1: Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```powershell
cd backend
npm install
```

### Step 2: Start the Backend Server

```powershell
npm start
```

The server will run on `http://localhost:5000`

You should see:
```
Server is running on http://localhost:5000
```

### Step 3: Open Frontend

Open the `frontend/index.html` file in your web browser:
- Right-click on `frontend/index.html` in VS Code and select "Open with Live Server"
- Or simply double-click the file to open it in your default browser

## API Endpoints

### GET /api/tasks
Get all tasks
```
curl http://localhost:5000/api/tasks
```

### GET /api/tasks/:id
Get a specific task
```
curl http://localhost:5000/api/tasks/1
```

### POST /api/tasks
Create a new task
```
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My Task"}'
```

### PUT /api/tasks/:id
Update a task
```
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### DELETE /api/tasks/:id
Delete a task
```
curl -X DELETE http://localhost:5000/api/tasks/1
```

### GET /api/health
Health check
```
curl http://localhost:5000/api/health
```

## Usage

1. Enter a task in the input field
2. Click "Add Task" or press Enter
3. Check the checkbox to mark a task as completed
4. Click "Delete" to remove a task
5. View task statistics at the bottom

## Notes

- Tasks are stored in memory and will be reset when the server restarts
- The frontend communicates with the backend via REST API using Fetch API
- CORS is enabled to allow frontend-backend communication on different ports

## Future Enhancements

- Add database (MongoDB, PostgreSQL)
- Add user authentication
- Add task categories/tags
- Add due dates
- Add task priority levels
- Deploy to cloud platform

## License

MIT License
