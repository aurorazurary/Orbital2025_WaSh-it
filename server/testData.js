const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');   // Adjust the path if needed
const Machine = require('./models/Machine');
require('dotenv').config();

const seedUsers = [
    { email: 'student1@u.nus.edu', password: 'password123', name: 'zhihan', isVerified: true},
    { email: 'student2@u.nus.edu', password: 'password234', name:'colin'},
];

const seedMachines = [
    { name: 'Washer #1', type: 'washer', status: 'available', location: 'PGPR', number:"1"},
    { name: 'Washer #2', type: 'washer', status: 'available', location: 'RVRC', number: "2"},
    { name: 'Dryer #1', type: 'dryer', status: 'available', location: 'UTR', number: "3"},
    { name: 'Dryer #2', type: 'dryer', status: 'occupied', location: 'KR', number: "1"},
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany();
        await Machine.deleteMany();

        // Hash passwords manually and create users
        const usersWithHashedPasswords = await Promise.all(
            seedUsers.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
            }))
        );

        const createdUsers = await User.insertMany(usersWithHashedPasswords);

        // Immediately fetch users from DB to confirm stored hash
        for (const u of createdUsers) {
            const userFromDb = await User.findById(u._id);
        }

        // Insert machines with some randomized bookings
        const machines = await Machine.insertMany(
            seedMachines.map((machine) => ({
                ...machine,
                status: Math.random() > 0.7 ? 'occupied' : machine.status,
                bookedBy:
                    Math.random() > 0.7
                        ? createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
                        : null,
                bookedAt: Math.random() > 0.7 ? new Date() : null,
            }))
        );

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

seedDB();