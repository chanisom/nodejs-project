import 'dotenv/config';
import express from 'express';

import studentsRoutes from './routes/studentsRoutes.js';
import coursesRoutes from './routes/coursesRoutes.js';
import enrollmentsRoutes from './routes/enrollmentsRoutes.js';

import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'השרת עובד',
    description: 'זהו שרת Node.js עם Express שמחזיר מידע על הקורסים, התלמידים והרישומים.'
  });
});

app.use(authMiddleware);


// חיבור ה-Routes
app.use('/students', studentsRoutes);
app.use('/courses', coursesRoutes);
app.use('/enrollments', enrollmentsRoutes);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`השרת רץ על http://localhost:${port}`);
});