# ToDo App 

**Done by Senuri Dissanayake**

Simple full-stack ToDo application with a React frontend, Node.js backend, and MySQL database.

---

## Prerequisites
-Node.js (v14 or higher)
-Docker Desktop
-PowerShell
-MySQL Workbench (optional for database inspection)

## Installation

Clone or extract the ToDo folder to your desired location.
Ensure Docker Desktop is installed and running.

## Running the Project

1. Navigate to the ToDo folder in PowerShell and start the backend and database:docker-compose up --build

2. Wait for Server running on port 8000 in the logs.

3. In a separate PowerShell window, navigate to the frontend folder and start the frontend:cd frontend
npm install -g serve
serve -s .

4. Confirm with Serving "/frontend" at http://localhost:3000.

5. Open your browser at http://localhost:3000 to use the app.

6. To stop the services, press Ctrl+C in both terminals, then run:docker-compose down in the ToDo folder.

## Usage

1. Add a task by entering a title and desciption clicking "Add Task".

2. View up to 5 recent incomplete tasks in the list.

3. Mark a task as "Done" by clicking the "Done" button (it will disappear).

4. Tasks are saved to the MySQL database.

## API Endponits
     POST /api/tasks - Create a new task.

     GET /api/tasks - Fetch all tasks.

     GET /api/tasks/:id/complete - Update the task as completed.

## Future Enhancements

Containerize the frontend with Docker (optional).
Add unit/integration tests for backend and frontend.
Add more styling or features (TBD).
