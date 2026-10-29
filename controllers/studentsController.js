import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from '../services/studentsService.js';

const sendServiceError = (res, error) => {
  res.status(error.statusCode || 500).json({ error: error.message });
};

export const getAllStudents = (req, res) => {
  return getAllStudentsService()
    .then((students) => res.json(students))
    .catch((error) => sendServiceError(res, error));
};

export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return getStudentByIdService(id)
    .then((student) => res.json(student))
    .catch((error) => sendServiceError(res, error));
};

export const createStudent = (req, res) => {
  const { name, phone, enrolledCourses } = req.body;

  return createStudentService(name, phone, enrolledCourses)
    .then((student) => res.json(student))
    .catch((error) => sendServiceError(res, error));
};

export const updateStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phone, enrolledCourses } = req.body;

  return updateStudentService(id, name, phone, enrolledCourses)
    .then((student) => res.json(student))
    .catch((error) => sendServiceError(res, error));
};

export const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return deleteStudentService(id)
    .then((result) => res.json(result))
    .catch((error) => sendServiceError(res, error));
};
