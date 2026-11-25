import {
  getAllEnrollmentsService,
  getEnrollmentByIdService,
  createEnrollmentService,
  deleteEnrollmentService
} from '../services/enrollmentsService.js';

const sendServiceError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'אירעה שגיאה בשרת' : error.message;
  res.status(statusCode).json({ error: message });
};

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await getAllEnrollmentsService();
    res.json(enrollments);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const getEnrollmentById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const enrollment = await getEnrollmentByIdService(id);
    res.json(enrollment);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const createEnrollment = async (req, res) => {
  try {
    const newEnrollment = await createEnrollmentService(
      req.body.studentId,
      req.body.courseId
    );
    res.json(newEnrollment);
  } catch (error) {
    sendServiceError(res, error);
  }
};

export const deleteEnrollment = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await deleteEnrollmentService(id);
    res.json(result);
  } catch (error) {
    sendServiceError(res, error);
  }
};