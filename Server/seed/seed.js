import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user/userModal.js';
import Project from '../models/project/ProjectModel.js';
import Task from '../models/task/taskSchema.js';
import dbConnect from "../config/dbConn.js"
dotenv.config();

const seed = async () => {
  try {
    await dbConnect();

    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    const hashedPassword = await bcrypt.hash('Test@123', 10);
    const user = await User.create({
      name: 'Rohit Singh',
      email: 'test@example.com',
      password: hashedPassword,
    });

    const projects = await Project.insertMany([
      {
        title: 'AI Assistant',
        description: 'Build an AI assistant app',
        status: 'active',
        user: user._id,
      },
      {
        title: 'Budget Tracker',
        description: 'Track daily/monthly expenses',
        status: 'active',
        user: user._id,
      },
    ]);

    for (let project of projects) {
      await Task.insertMany([
        {
          title: 'Setup project repo',
          description: 'Create repo and initial files',
          status: 'todo',
          dueDate: new Date(),
          project: project._id,
        },
        {
          title: 'Design UI',
          description: 'Create basic UI components',
          status: 'in-progress',
          dueDate: new Date(),
          project: project._id,
        },
        {
          title: 'Deploy to server',
          description: 'Host on Render or Vercel',
          status: 'todo',
          dueDate: new Date(),
          project: project._id,
        },
      ]);
    }

    console.log('Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
