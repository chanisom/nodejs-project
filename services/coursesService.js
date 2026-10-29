import { readCourses, saveCourses } from '../data/courses.js';
import { readStudents } from '../data/students.js';
import { createServiceError } from './serviceError.js';

export const getAllCoursesService = () => {
  return readCourses();
};

export const getCourseByIdService = (id) => {
  return Promise.all([readCourses(), readStudents()]).then(([courses, students]) => {
    const course = courses.find((item) => item.id === id);

    if (!course) {
      throw createServiceError(`קורס עם ID ${id} לא נמצא`, 404);
    }

    const enrolledStudents = students.filter((student) =>
      student.enrolledCourses.includes(id)
    );

    return {
      ...course,
      students: enrolledStudents
    };
  });
};

export const createCourseService = (name, description) => {
  if (!name || !description) {
    return Promise.reject(createServiceError('חסרים: name או description', 400));
  }

  return readCourses().then((courses) => {
    const newCourse = {
      id: courses.reduce((maxId, course) => Math.max(maxId, course.id), 0) + 1,
      name,
      description
    };

    courses.push(newCourse);
    return saveCourses(courses).then(() => newCourse);
  });
};

export const updateCourseService = (id, name, description) => {
  if (!name || !description) {
    return Promise.reject(createServiceError('חסרים: name או description', 400));
  }

  return readCourses().then((courses) => {
    const index = courses.findIndex((course) => course.id === id);

    if (index === -1) {
      throw createServiceError(`קורס עם ID ${id} לא נמצא`, 404);
    }

    const updatedCourse = { id, name, description };
    courses[index] = updatedCourse;

    return saveCourses(courses).then(() => updatedCourse);
  });
};

export const deleteCourseService = (id) => {
  return readCourses().then((courses) => {
    const index = courses.findIndex((course) => course.id === id);

    if (index === -1) {
      throw createServiceError(`קורס עם ID ${id} לא נמצא`, 404);
    }

    courses.splice(index, 1);
    return saveCourses(courses).then(() => ({
      message: `קורס עם ID ${id} נמחק בהצלחה`
    }));
  });
};
