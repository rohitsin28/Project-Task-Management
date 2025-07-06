import {
  badRequest,
  internalServerError,
  success,
} from "../../helper/apiResponse.js";
import { pagination } from "../../helper/utils.js";
import Project from "../../models/project/ProjectModel.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { userId } = req.user;
    if (!title || !description || !status)
      return badRequest(res, "Title description and status are required");

    const existingProject = await Project.findOne({
      title: title.trim(),
      user: userId,
    });

    if (existingProject) {
      return badRequest(res, "You already have a project with this title");
    }

    const project = await Project.create({
      title,
      description,
      status,
      user: userId,
    });

    return success(res, "Project created successfully", project);
  } catch (error) {
    return internalServerError(res, error);
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;

    if(id) {
      const getData = await Project.findOne({_id: id, user: userId});
      if(!getData)
        return badRequest(res,"Project not found");
      else
       return success(res, "Projects fetched successfully", getData);
    }

    const projects = await pagination({
      model: Project,
      query: { user: userId },
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [{ path: "user", select: "name" }],
    });
    return success(res, "Projects fetched successfully", projects);
  } catch (error) {
    return internalServerError(res, error);
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { userId } = req.user;

    const updated = await Project.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, status },
      { new: true }
    );

    if (!updated) return badRequest(res, "Project not found or unauthorized");
    return success(res, "Project updated", updated);
  } catch (error) {
    return internalServerError(res, error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const deleted = await Project.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) return badRequest(res, "Project not found or unauthorized");

    return success(res, "Project deleted", deleted);
  } catch (error) {
    return internalServerError(res, error);
  }
};
