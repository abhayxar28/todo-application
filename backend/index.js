const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todos');

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/todos', todoRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
});