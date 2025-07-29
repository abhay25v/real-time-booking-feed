document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const bookingsList = document.getElementById('bookings-list');
    // ... (other element selections)

    const createBookingCard = (booking) => {
        const card = document.createElement('li');
        card.className = 'booking-card';
        card.id = `booking-${booking.id}`;

        const statusClass = booking.status === 'Confirmed' ? 'status-confirmed' : 'status-pending';
        
        // *** NAME, PHONE, AND DATE ARE INSERTED INTO THE HTML HERE ***
        card.innerHTML = `
            <div class="booking-header">
                <div class="venue-info">
                    <i data-lucide="map-pin"></i>
                    <div>
                        <h3 class="venue-name">${booking.venueName}</h3>
                        <div class="customer-info">
                            <p>${booking.customerName}</p> 
                            <p>${booking.phone}</p>
                        </div>
                    </div>
                </div>
                <div class="status-badge ${statusClass}">${booking.status}</div>
            </div>
            <div class="booking-details">
                <div class="detail-item">
                    <p class="label"><i data-lucide="users"></i> Party Size</p>
                    <p class="value">${booking.partySize} people</p>
                </div>
                <div class="detail-item">
                    <p class="label"><i data-lucide="clock"></i> Time</p>
                    <p class="value">${booking.time}</p>
                </div>
                <div class="detail-item">
                    <p class="label"><i data-lucide="calendar"></i> Date</p>
                    <p class="value">${booking.date}</p>
                </div>
            </div>
        `;
        
        bookingsList.prepend(card);
        lucide.createIcons(); // Redraw icons
    };
    
    // ... (rest of the script to handle socket events and update stats)

    socket.on('initial-bookings', (bookings) => {
        allBookings = bookings;
        bookingsList.innerHTML = '';
        allBookings.forEach(createBookingCard);
        updateStats();
    });

    socket.on('new-booking', (booking) => {
        allBookings.unshift(booking);
        if (allBookings.length > 20) {
            const oldBooking = allBookings.pop();
            const oldCard = document.getElementById(`booking-${oldBooking.id}`);
            if (oldCard) oldCard.remove();
        }
        createBookingCard(booking);
        updateStats();
        showToast(booking);
    });

    lucide.createIcons();
});