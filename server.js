// Require express
const express = require('express');

const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter')
const uploadRouter = require('./routers/uploadRouter')
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Require connectDB
const connectDB = require('./config/connectDB');

// connectDB
connectDB();

// Use routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/uploads', uploadRouter);
const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));
app.use(express.static(path.join(_dirname, '/client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/client/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// Create port
const port = process.env.PORT || 5000;
// Launch the serveer
app.listen(port, (error) =>
    error
        ? console.log(error)
        : console.log(`The server is running on port ${port}`)
);
