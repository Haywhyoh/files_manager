import express from 'express';
import Routes from './routes/index';


const app = express();
Routes(app)
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, ()=> {
  console.log(`App is running on port ${port}`);
});

export default app;