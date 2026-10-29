import { readFile, writeFile } from 'node:fs/promises';

const coursesFile = new URL('./courses.json', import.meta.url);

export const readCourses = () => {
  return readFile(coursesFile, 'utf8').then((text) => JSON.parse(text));
};

export const saveCourses = (courses) => {
  const text = JSON.stringify(courses, null, 2);
  return writeFile(coursesFile, text, 'utf8');
};
