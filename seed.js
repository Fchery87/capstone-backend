import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';  // Adjust the import path if necessary

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const sampleEvents = [
  {
    title: 'Tech Conference 2024',
    description: 'Join us for a day of insightful talks and networking with industry leaders in technology.',
    date: new Date('2024-07-10'),
    time: '09:00',
    location: 'Silicon Valley Conference Center',
    category: 'Conference',
    imageUrl: 'https://example.com/images/tech-conference.jpg',  // Add a valid image URL if needed
    creator: 'Tech Events Inc.'
  },
  {
    title: 'Art & Craft Fair',
    description: 'Explore a variety of handcrafted goods and artworks from local artists and craftsmen.',
    date: new Date('2024-08-05'),
    time: '11:00',
    location: 'Downtown Art Plaza',
    category: 'Fair',
    imageUrl: 'https://example.com/images/art-fair.jpg',  // Add a valid image URL if needed
    creator: 'City Art Committee'
  },
  {
    title: 'Summer Music Festival',
    description: 'Enjoy live performances from your favorite bands and artists at the annual Summer Music Festival.',
    date: new Date('2024-06-25'),
    time: '15:00',
    location: 'Central Park',
    category: 'Festival',
    imageUrl: 'https://example.com/images/music-festival.jpg',  // Add a valid image URL if needed
    creator: 'Festival Organizers'
  }
];

const seedDatabase = async () => {
  try {
    await Event.deleteMany({});
    await Event.insertMany(sampleEvents);
    console.log('Sample events inserted successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting sample events:', err);
  }
};

seedDatabase();
