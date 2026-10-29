import { readEnrollments, saveEnrollments } from '../data/enrollments.js';
import { readStudents } from '../data/students.js';
import { readCourses } from '../data/courses.js';
import { createServiceError } from './serviceError.js';

export const getAllEnrollmentsService = () => {
  return readEnrollments();
};

export const getEnrollmentByIdService = (id) => {
  return readEnrollments().then((enrollments) => {
    const enrollment = enrollments.find((item) => item.id === id);

    if (!enrollment) {
      throw createServiceError(`רישום עם ID ${id} לא נמצא`, 404);
    }

    return enrollment;
  });
};

export const createEnrollmentService = (studentId, courseId) => {
  if (!studentId || !courseId) {
    return Promise.reject(createServiceError('חסרים: studentId או courseId', 400));
  }

  return Promise.all([readEnrollments(), readStudents(), readCourses()])
    .then(([enrollments, students, courses]) => {
      const studentExists = students.find((student) => student.id === studentId);
      if (!studentExists) {
        throw createServiceError(`תלמיד עם ID ${studentId} לא נמצא`, 404);
      }

      const courseExists = courses.find((course) => course.id === courseId);
      if (!courseExists) {
        throw createServiceError(`קורס עם ID ${courseId} לא נמצא`, 404);
      }

      const alreadyEnrolled = enrollments.find(
        (enrollment) =>
          enrollment.studentId === studentId && enrollment.courseId === courseId
      );
      if (alreadyEnrolled) {
        throw createServiceError('התלמיד כבר רשום לקורס הזה', 400);
      }

      const newEnrollment = {
        id: enrollments.reduce((maxId, enrollment) => Math.max(maxId, enrollment.id), 0) + 1,
        studentId,
        courseId
      };

      enrollments.push(newEnrollment);
      return saveEnrollments(enrollments).then(() => newEnrollment);
    });
};

export const deleteEnrollmentService = (id) => {
  return readEnrollments().then((enrollments) => {
    const index = enrollments.findIndex((enrollment) => enrollment.id === id);

    if (index === -1) {
      throw createServiceError(`רישום עם ID ${id} לא נמצא`, 404);
    }

    enrollments.splice(index, 1);
    return saveEnrollments(enrollments).then(() => ({
      message: `רישום עם ID ${id} נמחק בהצלחה`
    }));
  });
};