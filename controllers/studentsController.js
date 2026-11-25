import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from '../services/studentsService.js';

const sendServiceError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'אירעה שגיאה בשרת' : error.message;
  res.status(statusCode).json({ error: message });
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await getAllStudentsService();
    res.json(students);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const getStudentById =  async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const student = await getStudentByIdService(id);
    res.json(student);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const createStudent = async (req, res) => {
  const { name, phone, enrolledCourses } = req.body;

  try {
    const student = await createStudentService(name, phone, enrolledCourses);
    res.json(student);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phone, enrolledCourses } = req.body;

  try {
    const student = await updateStudentService(id, name, phone, enrolledCourses);
    res.json(student);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await deleteStudentService(id);
    res.json(result);
  } catch (error) {
    sendServiceError(res, error);
  }
};
