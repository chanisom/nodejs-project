import {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService
} from '../services/coursesService.js';

const sendServiceError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'אירעה שגיאה בשרת' : error.message;
  res.status(statusCode).json({ error: message });
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.json(courses);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const getCourseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const course = await getCourseByIdService(id);
    res.json(course);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const createCourse = async (req, res) => {
  const { name, description } = req.body;

  try {
    const course = await createCourseService(name, description);
    res.json(course);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const updateCourse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  try {
    const course = await updateCourseService(id, name, description);
    res.json(course);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const deleteCourse = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await deleteCourseService(id);
    res.json(result);
  } catch (error) {
    sendServiceError(res, error);
  }
};
