# ToDo App 

**Done by Senuri Dissanayake**

Simple full-stack ToDo application with a React frontend, Node.js backend, and MySQL database.

---

## Prerequisites
-Node.js (v14 or higher)

-Docker Desktop

-PowerShell

-MySQL Workbench 

## Installation

Clone or extract the ToDo folder to your desired location.
Ensure Docker Desktop is installed and running.

## Running the Project

1. Navigate to the ToDo folder in PowerShell and start all components:
  
         docker-compose up --build

2. Wait for the services to start (check logs for confirmation).

3. Open your browser at http://localhost:3000 to use the app.

4. To stop, press Ctrl+C, then run:

        docker-compose down

5. Use MySQL Workbench to connect to localhost:3307 (user: root, password: rootpassword) to verify tasks:

        SELECT * FROM todo_db.task;

## Usage

1. Add a task by entering a title and desciption clicking "Add Task".

2. View up to 5 recent incomplete tasks in the list.

3. Mark a task as "Done" by clicking the "Done" button (it will disappear).

4. Tasks are saved to the MySQL database.

## API Endponits
     POST /api/tasks - Create a new task.

     GET /api/tasks - Fetch all tasks.

     GET /api/tasks/:id/complete - Update the task as completed.

## Testing

**Backend** Add unit and intergration testing
     
     npm test 
