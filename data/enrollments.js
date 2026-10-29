import { readFile, writeFile } from 'node:fs/promises';

const enrollmentsFile = new URL('./enrollments.json', import.meta.url);

export const readEnrollments = () => {
  return readFile(enrollmentsFile, 'utf8').then((text) => JSON.parse(text));
};

export const saveEnrollments = (enrollments) => {
  const text = JSON.stringify(enrollments, null, 2);
  return writeFile(enrollmentsFile, text, 'utf8');
};
