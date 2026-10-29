import { readFile, writeFile } from 'node:fs/promises';

const studentsFile = new URL('./students.json', import.meta.url);

export const readStudents = () => {
  return readFile(studentsFile, 'utf8').then((text) => JSON.parse(text));
};

export const saveStudents = (students) => {
  const text = JSON.stringify(students, null, 2);
  return writeFile(studentsFile, text, 'utf8');
};
