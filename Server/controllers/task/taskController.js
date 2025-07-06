import mongoose from 'mongoose';
import Task from '../../models/task/taskSchema.js';
import { pagination } from '../../helper/utils.js';
import { success, badRequest, internalServerError } from '../../helper/apiResponse.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;

    if (!title || !description)
      return badRequest(res, 'Title, description are required');

    if(!mongoose.Types.ObjectId.isValid(projectId))
      return badRequest(res, "Please give valid projectId.");

    const existingProject = await Task.findOne({
      title: title.trim(),
      project: projectId,
    });

    if (existingProject) {
      return badRequest(res, "You already have a task with this title");
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      project: projectId,
    });

    return success(res, 'Task created successfully', task);
  } catch (error) {
    return internalServerError(res, error);
  }
};

export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    let { status = "todo", page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const query = { project: projectId };
    if (status) query.status = status;

    const tasks = await pagination({
      model: Task,
      query,
      page,
      limit,
      select: "-__v",
      populate: [{path: "project", select: "title description"}]
    })

    return success(res, 'Tasks fetched', tasks);
  } catch (error) {
    return internalServerError(res, error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) return badRequest(res, 'Task not found');

    return success(res, 'Task updated', updatedTask);
  } catch (error) {
    return internalServerError(res, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return badRequest(res, 'Task not found');

    return success(res, 'Task deleted', deletedTask);
  } catch (error) {
    return internalServerError(res, error);
  }
};
