const express = require('express');
const app = express();
const Routes = require('./Routes/User_Routes');

require('./conn');
app.use(express.json());

app.use('/apoo', Routes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(8000, () => {
  console.log('Server listening on port 2000...');
});

// Example endpoint to stop the server gracefully
