const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let bookings = [];

// --- Data for generating random bookings ---
const venueNames = ['Sky Deck', 'Sunset Terrace', 'The Grand Hall', 'Rooftop Garden', 'Seaside Pavilion', 'Crystal Ballroom'];
const customerNames = ['Sarah Johnson', 'Alex Martinez', 'Michael Chen', 'Emily Rodriguez', 'David Thompson', 'Jessica Williams'];
const times = ['10:00 AM', '12:30 PM', '4:00 PM', '6:30 PM', '8:00 PM'];
const statuses = ['Pending', 'Confirmed'];

// --- This function now creates all the data the new UI needs ---
const generateRandomBooking = () => {
    const now = new Date();
    return {
        id: Math.random().toString(36).substring(2, 11),
        venueName: venueNames[Math.floor(Math.random() * venueNames.length)],
        // *** NAME, PHONE, DATE, AND STATUS ARE NOW GENERATED HERE ***
        customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        partySize: Math.floor(Math.random() * 180) + 20,
        time: times[Math.floor(Math.random() * times.length)],
        date: now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: now
    };
};

io.on('connection', (socket) => {
    console.log('A client connected.');
    // Send the current list of bookings to the new client
    socket.emit('initial-bookings', bookings);

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});

// Simulate and broadcast a new booking every 5 seconds
setInterval(() => {
    const newBooking = generateRandomBooking();
    bookings.unshift(newBooking); // Add to the start of the array

    // Keep the bookings array from growing indefinitely
    if (bookings.length > 20) {
        bookings.pop();
    }

    console.log('Broadcasting new booking:', newBooking);
    io.emit('new-booking', newBooking);
}, 5000);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});