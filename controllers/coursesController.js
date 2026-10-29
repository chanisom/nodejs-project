import {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService
} from '../services/coursesService.js';

const sendServiceError = (res, error) => {
  res.status(error.statusCode || 500).json({ error: error.message });
};

export const getAllCourses = (req, res) => {
  return getAllCoursesService()
    .then((courses) => res.json(courses))
    .catch((error) => sendServiceError(res, error));
};

export const getCourseById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return getCourseByIdService(id)
    .then((course) => res.json(course))
    .catch((error) => sendServiceError(res, error));
};

export const createCourse = (req, res) => {
  const { name, description } = req.body;

  return createCourseService(name, description)
    .then((course) => res.json(course))
    .catch((error) => sendServiceError(res, error));
};

export const updateCourse = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  return updateCourseService(id, name, description)
    .then((course) => res.json(course))
    .catch((error) => sendServiceError(res, error));
};

export const deleteCourse = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return deleteCourseService(id)
    .then((result) => res.json(result))
    .catch((error) => sendServiceError(res, error));
};
