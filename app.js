const express = require('express');

const port = process.env.PORT || 3009;

const referentielRouter = require('./routes/referentiel');
const medicamentsRouter = require('./routes/medicaments');

const app = express();

app.use(express.json());

app.use('/api/referentiel', referentielRouter);
app.use('/api/medicaments', medicamentsRouter);

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
