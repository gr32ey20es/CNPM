import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/a', (req, res) => {
  res.send(
    {
      count: req.query.count + 1
    }
  );
})

app.get('*', (req, res) => {
  res.send('404 Page Not Found');
})

app.listen(4000, () => {
  console.log('listening for requests on port 4000')
})
