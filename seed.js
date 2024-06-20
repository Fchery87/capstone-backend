import mongoose from 'mongoose'; // Bringing in mongoose to connect to MongoDB
import dotenv from 'dotenv'; // dotenv helps us keep our environment variables in check
import Event from './models/Event.js';  // Importing the Event model

// Load up them environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('MongoDB connected')) // MongoDB is live, baby
  .catch((err) => console.log(err)); // Something went wrong, check the error

// Sample events to seed the database
const sampleEvents = [
  {
    title: 'Tech Conference 2024',
    description: 'Join us for a day of insightful talks and networking with industry leaders in technology.',
    date: new Date('2024-07-10'),
    time: '09:00',
    location: 'Silicon Valley Conference Center',
    category: 'Conference',
    imageUrl: 'https://example.com/images/tech-conference.jpg',  
    creator: 'Tech Events Inc.'
  },
  {
    title: 'Art & Craft Fair',
    description: 'Explore a variety of handcrafted goods and artworks from local artists and craftsmen.',
    date: new Date('2024-08-05'),
    time: '11:00',
    location: 'Downtown Art Plaza',
    category: 'Fair',
    imageUrl: 'https://example.com/images/art-fair.jpg',  
    creator: 'City Art Committee'
  },
  {
    title: 'Summer Music Festival',
    description: 'Enjoy live performances from your favorite bands and artists at the annual Summer Music Festival.',
    date: new Date('2024-06-25'),
    time: '15:00',
    location: 'Central Park',
    category: 'Festival',
    imageUrl: 'https://example.com/images/music-festival.jpg',  
    creator: 'Festival Organizers'
  }
];

// Function to seed the database with sample events
const seedDatabase = async () => {
  try {
    await Event.deleteMany({}); // Clear out all existing events
    await Event.insertMany(sampleEvents); // Insert the sample events
    console.log('Sample events inserted successfully'); // Log success message
    mongoose.disconnect(); // Disconnect from the database
  } catch (err) {
    console.error('Error inserting sample events:', err); // Log any errors
  }
};

// Call the seedDatabase function to seed the database
seedDatabase();
