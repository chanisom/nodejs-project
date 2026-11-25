import { readCourses, saveCourses } from '../data/courses.js';
import { readStudents } from '../data/students.js';
import { createServiceError } from './serviceError.js';

export const getAllCoursesService = async () => {
  return await readCourses();
};

export const getCourseByIdService = async (id) => {
  const [courses, students] = await Promise.all([readCourses(), readStudents()]);

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
  };


export const createCourseService = async (name, description) => {
  if (!name || !description) {
    throw createServiceError('חסרים: name או description', 400);
  }

  const courses = await readCourses();
  const newCourse = {
    id: courses.reduce((maxId, course) => Math.max(maxId, course.id), 0) + 1,
    name,
    description
  };

    courses.push(newCourse);
    await saveCourses(courses);
    return newCourse;
};

export const updateCourseService = async (id, name, description) => {
  if (!name || !description) {
    throw createServiceError('חסרים: name או description', 400);
  }

  const courses = await readCourses();
  const index = courses.findIndex((course) => course.id === id);

    if (index === -1) {
      throw createServiceError(`קורס עם ID ${id} לא נמצא`, 404);
    }

    const updatedCourse = { id, name, description };
    courses[index] = updatedCourse;

    await saveCourses(courses);
    return updatedCourse;

};

export const deleteCourseService = async (id) => {
  const courses = await readCourses();
  const index = courses.findIndex((course) => course.id === id);

    if (index === -1) {
      throw createServiceError(`קורס עם ID ${id} לא נמצא`, 404);
    }

    courses.splice(index, 1);
    await saveCourses(courses);
    return { message: `קורס עם ID ${id} נמחק בהצלחה` };
};
