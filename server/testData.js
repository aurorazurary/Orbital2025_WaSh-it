const mongoose = require('mongoose');
const User = require('./models/User');
const Machine = require('./models/Machine');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedUsers = [
    {
        email: 'e123456@u.nus.edu',
        password: 'password123'
    },
    {
        email: 'e234567@u.nus.edu',
        password: 'password123'
    }
];

const seedMachines = [
    {
        name: 'Washer #1',
        type: 'washer',
        status: 'available'
    },
    {
        name: 'Washer #2',
        type: 'washer',
        status: 'available'
    },
    {
        name: 'Dryer #1',
        type: 'dryer',
        status: 'available'
    },
    {
        name: 'Dryer #2',
        type: 'dryer',
        status: 'booked'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Clear existing data
        await User.deleteMany();
        await Machine.deleteMany();

        // Hash passwords and create users
        const createdUsers = await User.create(
            await Promise.all(seedUsers.map(async user => ({
                    ...user,
                    password: await bcrypt.hash(user.password, 12)
                }))
            ));

        // Create machines with random bookings
        const machines = await Machine.insertMany(seedMachines.map(machine => ({
            ...machine,
            // Randomly book some machines
            status: Math.random() > 0.7 ? 'booked' : machine.status,
            bookedBy: Math.random() > 0.7 ?
                createdUsers[Math.floor(Math.random() * createdUsers.length)]._id :
                null,
            bookedAt: Math.random() > 0.7 ? new Date() : null
        })));

        console.log('Database seeded successfully!');
        console.log('Test users created:', createdUsers.map(u => u.email));
        console.log('Machines created:', machines.length);
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        mongoose.disconnect();
    }
};

seedDB();