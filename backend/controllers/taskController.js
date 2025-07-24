import Task from '../models/taskModel.js';

     export default {
       createTask: async (req, res) => {
         try {
           const { title, description } = req.body;
           if (!title) {
             return res.status(400).json({ error: 'Title is required' });
           }
           const task = await Task.create({ title, description });
           res.status(201).json(task);
         } catch (error) {
           res.status(500).json({ error: 'Server error' });
         }
       },

       getTasks: async (req, res) => {
         try {
           const tasks = await Task.findRecent();
           res.json(tasks);
         } catch (error) {
           res.status(500).json({ error: 'Server error' });
         }
       },

       completeTask: async (req, res) => {
         try {
           const { id } = req.params;
           const task = await Task.complete(id);
           res.json(task);
         } catch (error) {
           if (error.message === 'Task not found') {
             return res.status(404).json({ error: 'Task not found' });
           }
           res.status(500).json({ error: 'Server error' });
         }
       }
     };