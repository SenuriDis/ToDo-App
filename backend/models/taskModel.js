import pool from '../config/db.js';

     const Task = {
       async create({ title, description }) {
         const [result] = await pool.query(
           'INSERT INTO task (title, description) VALUES (?, ?)',
           [title, description]
         );
         return { id: result.insertId, title, description, completed: false };
       },

       async findRecent() {
         const [rows] = await pool.query(
           'SELECT * FROM task WHERE completed = 0 ORDER BY created_at DESC LIMIT 5'
         );
         return rows;
       },

       async complete(id) {
         const [result] = await pool.query(
           'UPDATE task SET completed = 1 WHERE id = ?',
           [id]
         );
         if (result.affectedRows === 0) {
           throw new Error('Task not found');
         }
         return { id, completed: true };
       }
     };

     export default Task;