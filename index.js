const express = require('express');
const productRouter = require('./routes/productsRoutes');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(express.json());
const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('Hello World 🧑‍🚀🚀');
});

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.listen(PORT, () => console.log(`WE'RE RUNING ON ${PORT}`));
