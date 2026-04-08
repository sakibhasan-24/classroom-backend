
import express from 'express';
import subjectRouter from './routes/subjects';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use("/api/subjects",subjectRouter);
app.listen(3000, () => {
  console.log('Server is running on port 3000.......');
})