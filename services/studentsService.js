import { readCourses } from '../data/courses.js';
import { readStudents, saveStudents } from '../data/students.js';
import { createServiceError } from './serviceError.js';

export const getAllStudentsService = () => {
  return readStudents();
};

export const getStudentByIdService = (id) => {
  return Promise.all([readStudents(), readCourses()]).then(([students, courses]) => {
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
  });
};

export const createStudentService = (name, phone, enrolledCourses) => {
  if (!name || !phone) {
    return Promise.reject(createServiceError('חסרים: name או phone', 400));
  }

  return readStudents().then((students) => {
    const newStudent = {
      id: students.reduce((maxId, student) => Math.max(maxId, student.id), 0) + 1,
      name,
      phone,
      enrolledCourses: enrolledCourses || []
    };

    students.push(newStudent);
    return saveStudents(students).then(() => newStudent);
  });
};

export const updateStudentService = (id, name, phone, enrolledCourses) => {
  if (!name || !phone) {
    return Promise.reject(createServiceError('חסרים: name או phone', 400));
  }

  return readStudents().then((students) => {
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
    return saveStudents(students).then(() => updatedStudent);
  });
};

export const deleteStudentService = (id) => {
  return readStudents().then((students) => {
    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw createServiceError(`תלמיד עם ID ${id} לא נמצא`, 404);
    }

    students.splice(index, 1);
    return saveStudents(students).then(() => ({
      message: `תלמיד עם ID ${id} נמחק בהצלחה`
    }));
  });
};
