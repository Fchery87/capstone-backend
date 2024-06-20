import express from 'express'; // Yo, we need express to set up this server
import dotenv from 'dotenv'; // dotenv helps us keep our environment variables in check
import mongoose from 'mongoose'; // Mongoose connects us to our MongoDB
import morgan from 'morgan'; // Morgan logs all our requests, keeping us in the know
import cors from 'cors'; // CORS lets us handle cross-origin requests like a boss
import authRoutes from './routes/auth.js'; // Bringing in our authentication routes
import eventRoutes from './routes/events.js'; // Bringing in our event routes

// Load up them environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('MongoDB connected')) // MongoDB is live, baby
  .catch((err) => console.log(err)); // Something went wrong, check the error

const app = express(); // Setting up our express app
const PORT = process.env.PORT || 4000; // Port number, default to 4000 if not specified

// Middleware setup
app.use(morgan('dev')); // Logging requests with morgan in 'dev' mode
app.use(cors()); // Handling cross-origin requests
app.use(express.json()); // Parsing JSON bodies

// Setting up routes
app.use('/api/auth', authRoutes); // All /api/auth requests go through authRoutes
app.use('/api/events', eventRoutes); // All /api/events requests go through eventRoutes

// Test route
app.get('/', (req, res) => {
  res.send('Server is running'); // Server's live and kicking
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); // Logging the port number we're running on
