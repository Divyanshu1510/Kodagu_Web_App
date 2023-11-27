import Task, { find, findById, findByIdAndUpdate, findByIdAndDelete, countDocuments } from '../models/task';

async function createTask(req, res) {
  const { title, description, assignedUser, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      assignedUser,
      dueDate,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getTaskById(req, res) {
  const taskId = req.params.taskId;

  try {
    const task = await findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.taskId;
  const { title, description, assignedUser, dueDate, completed } = req.body;

  try {
    const updatedTask = await findByIdAndUpdate(
      taskId,
      { title, description, assignedUser, dueDate, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function taskCompletionStats(req, res) {
  try {
    const totalTasks = await countDocuments();
    const completedTasks = await countDocuments({ completed: true });

    const stats = {
      totalTasks,
      completedTasks,
      completionRate: totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100,
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  taskCompletionStats,
};
