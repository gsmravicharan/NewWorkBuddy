require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Route modules
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const workerRoutes = require('./routes/worker.routes');
const handicapperRoutes = require('./routes/handicapper.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/handicappers', handicapperRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
