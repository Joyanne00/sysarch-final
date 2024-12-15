const express = require('express'); // Corrected the syntax to use require
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = "mongodb+srv://joyannesoledadlutero:WEH-QqX-25c-kKU@cluster0.o81w8.mongodb.net/sysarch-final?retryWrites=true&w=majority&appName=Cluster0"

// MongoDB Connection
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String
});

// Task Schema
const taskSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
  dueDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true // this is reference
  }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// API Routes

// Login endpoint (using mock users, adjust as needed)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    // Replace this mock logic with actual user authentication logic (e.g., password hashing)
   try {
    const user = await User.findOne({ email, password });
   //if no user found
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ success: true, message: 'Login successful', user });
   } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message });
   }
});

// Signup endpoint (create a new user)
app.post('/api/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        res.json({ success: true, message: 'Signup successful', user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    // Add logic for logging out (e.g., clearing sessions or tokens)
    res.json({ success: true, message: 'Logout successful' });
});

// Get Profile
app.get('/api/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Profile
app.put('/api/profile/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Task Management endpoints (Mock tasks for the purpose of this example)
let tasks = []; // Replace this with actual database logic
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.query.userId}).exec()

    return res.status(200).json({
      success: true,
      tasks
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({error: e.message})
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  // const newTask = { id: tasks.length + 1, title, description };
  // tasks.push(newTask);
  // res.json({ success: true, message: 'Task added', task: newTask });
  try {
    const addedTask = await Task.create({description, userId: req.query.userId, completed: false})
    
    return res.status(201).json({
      success: true,
      task: addedTask
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({error: e.message})
  }
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = tasks.find(task => task.id === parseInt(id));
  if (task) {
    task.title = title;
    task.description = description;
    res.json({ success: true, message: 'Task updated', task });
  } else {
    res.status(404).json({ success: false, message: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  // const { id } = req.params;
  // tasks = tasks.filter(task => task.id !== parseInt(id));
  // res.json({ success: true, message: 'Task deleted' });
  try {
    await Task.findOneAndDelete({_id: req.params.id, userId: req.query.userId})
    return res.status(200).json({success: true, message: "Task deleted"})
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: e.message
    })
  }
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  const filteredTasks = tasks.filter(task =>
    task.title.includes(query) || task.description.includes(query)
  );
  res.json(filteredTasks);
});

// Settings endpoint (mocked for now)
app.get('/api/settings', (req, res) => {
  res.json({ theme: 'light', notifications: true });
});

app.put('/api/settings', (req, res) => {
  const { theme, notifications } = req.body;
  res.json({ success: true, message: 'Settings updated', settings: { theme, notifications } });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
