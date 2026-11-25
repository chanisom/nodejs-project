import { readFile, writeFile } from 'node:fs/promises';

const enrollmentsFile = new URL('./enrollments.json', import.meta.url);

export const readEnrollments = async () => {
  const text = await readFile(enrollmentsFile, 'utf8');
  return JSON.parse(text);
};

export const saveEnrollments = async (enrollments) => {
  const text = JSON.stringify(enrollments, null, 2);
  await writeFile(enrollmentsFile, text, 'utf8');
};
