import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
