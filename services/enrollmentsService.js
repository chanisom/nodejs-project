import { readEnrollments, saveEnrollments } from '../data/enrollments.js';
import { readStudents } from '../data/students.js';
import { readCourses } from '../data/courses.js';
import { createServiceError } from './serviceError.js';

export const getAllEnrollmentsService = async () => {
  const enrollments = await readEnrollments();
  return enrollments;
};

export const getEnrollmentByIdService = async (id) => {
  const enrollments = await readEnrollments();
  const enrollment = enrollments.find((item) => item.id === id);
  if (!enrollment) {
      throw createServiceError(`רישום עם ID ${id} לא נמצא`, 404);
  }
    return enrollment;
  };

export const createEnrollmentService = async (studentId, courseId) => {
  if (!studentId || !courseId) {
    throw createServiceError('חסרים: studentId או courseId', 400);
  }

  const [enrollments, students, courses] = await Promise.all([readEnrollments(), readStudents(), readCourses()]);
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
      await saveEnrollments(enrollments);
      return newEnrollment;
    };

export const deleteEnrollmentService = async (id) => {
  const enrollments = await readEnrollments();
  const index = enrollments.findIndex((enrollment) => enrollment.id === id);

    if (index === -1) {
      throw createServiceError(`רישום עם ID ${id} לא נמצא`, 404);
    }

    enrollments.splice(index, 1);
    await saveEnrollments(enrollments);
    return { message: `רישום עם ID ${id} נמחק בהצלחה` };
  };