import 'dotenv';
import express from 'express';
import subjectRouter from './routes/subjects';
import cors from 'cors';
const app = express();

if(process.env.FRONTEND_URL == undefined){
  throw new Error("FRONTEND_URL is not defined");
}
app.use(cors({
  origin:process.env.FRONTEND_URL,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use("/api/subjects",subjectRouter);
app.listen(3000, () => {
  console.log('Server is running on port 3000.......');
})