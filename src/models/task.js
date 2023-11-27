import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedUser: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
});

const Task = model('Task', taskSchema);

export default Task;
