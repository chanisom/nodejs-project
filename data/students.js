import { readFile, writeFile } from 'node:fs/promises';

const studentsFile = new URL('./students.json', import.meta.url);

export const readStudents = async () => {
  const text = await readFile(studentsFile, 'utf8');
  return JSON.parse(text);
};

export const saveStudents = async (students) => {
  const text = JSON.stringify(students, null, 2);
  await writeFile(studentsFile, text, 'utf8');
};
