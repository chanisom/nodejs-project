import {
  getAllEnrollmentsService,
  getEnrollmentByIdService,
  createEnrollmentService,
  deleteEnrollmentService
} from '../services/enrollmentsService.js';

const sendServiceError = (res, error) => {
  res.status(error.statusCode || 500).json({ error: error.message });
};

export const getAllEnrollments = (req, res) => {
  return getAllEnrollmentsService()
    .then((enrollments) => res.json(enrollments))
    .catch((error) => sendServiceError(res, error));
};

export const getEnrollmentById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return getEnrollmentByIdService(id)
    .then((enrollment) => res.json(enrollment))
    .catch((error) => sendServiceError(res, error));
};

export const createEnrollment = (req, res) => {
  return createEnrollmentService(
    req.body.studentId,
    req.body.courseId
  )
    .then((newEnrollment) => res.json(newEnrollment))
    .catch((error) => sendServiceError(res, error));
};

export const deleteEnrollment = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return deleteEnrollmentService(id)
    .then((result) => res.json(result))
    .catch((error) => sendServiceError(res, error));
};