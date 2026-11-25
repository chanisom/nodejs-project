import { readFile, writeFile } from 'node:fs/promises';

const coursesFile = new URL('./courses.json', import.meta.url);

export const readCourses = async () => {
  const text = await readFile(coursesFile, 'utf8');
  return JSON.parse(text);
};

export const saveCourses = async (courses) => {
  const text = JSON.stringify(courses, null, 2);
  await writeFile(coursesFile, text, 'utf8');
};
