import { readCourses } from '../data/courses.js';
import { readStudents, saveStudents } from '../data/students.js';
import { createServiceError } from './serviceError.js';

export const getAllStudentsService = async () => {
  return await readStudents();
};

export const getStudentByIdService = async (id) => {
  const [students, courses] = await Promise.all([readStudents(), readCourses()]);
    const student = students.find((item) => item.id === id);

    if (!student) {
      throw createServiceError(`תלמיד עם ID ${id} לא נמצא`, 404);
    }

    const enrolledCourses = courses.filter((course) =>
      student.enrolledCourses.includes(course.id)
    );

    return {
      ...student,
      courseDetails: enrolledCourses
    };
};

export const createStudentService = async (name, phone, enrolledCourses) => {
  if (!name || !phone) {
    throw createServiceError('חסרים: name או phone', 400);
  }

  const students = await readStudents();
  const newStudent = {
    id: students.reduce((maxId, student) => Math.max(maxId, student.id), 0) + 1,
    name,
    phone,
    enrolledCourses: enrolledCourses || []
  };

    students.push(newStudent);
    await saveStudents(students);
    return newStudent;
};

export const updateStudentService = async (id, name, phone, enrolledCourses) => {
  if (!name || !phone) {
    throw createServiceError('חסרים: name או phone', 400);
  }

  const students = await readStudents();
  const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw createServiceError(`תלמיד עם ID ${id} לא נמצא`, 404);
    }

    const updatedStudent = {
      id,
      name,
      phone,
      enrolledCourses: enrolledCourses || []
    };

    students[index] = updatedStudent;
    await saveStudents(students);
    return updatedStudent;
};

export const deleteStudentService = async (id) => {
  const students = await readStudents();
  const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw createServiceError(`תלמיד עם ID ${id} לא נמצא`, 404);
    }

    students.splice(index, 1);
    await saveStudents(students);
    return { message: `תלמיד עם ID ${id} נמחק בהצלחה` };
};
