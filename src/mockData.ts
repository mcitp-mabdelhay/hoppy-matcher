import { User, CurrentUser } from './types';

export const CURRENT_USER: CurrentUser = {
  id: 'u1',
  name: 'Alex',
  age: 28,
  bio: 'Looking for someone to hike and code with.',
  location: 'San Francisco, CA',
  distance: 0,
  hobbies: ['Hiking', 'Coding', 'Photography', 'Coffee'],
  photos: ['https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80'],
  isVerified: true,
  isOnline: true,
  privacy: {
    showOnlineStatus: true,
    showLocation: true,
    allowMessagesFromUnmatched: false,
    endToEndEncryption: true,
  }
};

export const POTENTIAL_MATCHES: User[] = [
  {
    id: 'm1',
    name: 'Sarah',
    age: 26,
    bio: 'Avid reader and weekend hiker. Always down for coffee and deep conversations.',
    location: 'Oakland, CA',
    distance: 5,
    hobbies: ['Hiking', 'Reading', 'Coffee', 'Dogs', 'Photography'],
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'],
    isVerified: true,
    isOnline: true,
  },
  {
    id: 'm2',
    name: 'David',
    age: 29,
    bio: 'Software engineer by day, amateur chef by night. Let\'s cook something together.',
    location: 'San Francisco, CA',
    distance: 2,
    hobbies: ['Coding', 'Cooking', 'Wine', 'Movies'],
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'],
    isVerified: true,
    isOnline: false,
  },
  {
    id: 'm3',
    name: 'Jessica',
    age: 27,
    bio: 'Plant mom. Yoga enthusiast. Let\'s find the best vegan spots in the city.',
    location: 'Berkeley, CA',
    distance: 8,
    hobbies: ['Yoga', 'Vegan Food', 'Hiking', 'Plants'],
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'],
    isVerified: false,
    isOnline: true,
  },
];
