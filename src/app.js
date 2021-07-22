const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;

const referentielRouter = require('./routes/referentiel');
const medicamentsRouter = require('./routes/medicaments');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/referentiel', referentielRouter);
app.use('/api/medicaments', medicamentsRouter);

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
