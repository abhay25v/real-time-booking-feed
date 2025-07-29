document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // --- Element Selectors ---
    const totalBookingsEl = document.getElementById('total-bookings');
    const todayBookingsEl = document.getElementById('today-bookings');
    const totalGuestsEl = document.getElementById('total-guests');
    const estRevenueEl = document.getElementById('est-revenue');
    const recentCountEl = document.getElementById('recent-count');
    const bookingsList = document.getElementById('bookings-list');
    const toastContainer = document.getElementById('toast-container');

    // --- State Management ---
    let allBookings = [];

    // --- Functions ---

    /**
     * Updates the statistics cards based on the current booking data.
     */
    const updateStats = () => {
        const today = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
        
        const todayCount = allBookings.filter(b => b.date === today).length;
        const totalGuests = allBookings.reduce((sum, b) => sum + b.partySize, 0);
        const estimatedRevenue = totalGuests * 85; // Assuming $85 per guest

        totalBookingsEl.textContent = allBookings.length;
        todayBookingsEl.textContent = todayCount;
        totalGuestsEl.textContent = totalGuests.toLocaleString();
        estRevenueEl.textContent = `$${estimatedRevenue.toLocaleString()}`;
        recentCountEl.textContent = allBookings.length;
    };
    
    /**
     * Creates and prepends a new booking card to the list.
     * @param {object} booking - The booking data object.
     */
    const createBookingCard = (booking) => {
        const card = document.createElement('li');
        card.className = 'booking-card';
        card.id = `booking-${booking.id}`;

        const statusClass = booking.status === 'Confirmed' ? 'status-confirmed' : 'status-pending';
        
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
        lucide.createIcons(); // Redraw icons for the new card
    };
    
    /**
     * Shows a toast notification for a new booking.
     * @param {object} booking - The booking data object.
     */
    const showToast = (booking) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i data-lucide="bell-ring"></i>
            <div>
                <strong>New Booking Received!</strong>
                <p style="margin: 0; font-size: 0.85rem;">${booking.customerName} - ${booking.venueName}</p>
            </div>
        `;
        toastContainer.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    };

    // --- Socket.IO Event Listeners ---

    // Fired when the client first connects, receives all current bookings
    socket.on('initial-bookings', (bookings) => {
        allBookings = bookings;
        bookingsList.innerHTML = ''; // Clear list before adding
        allBookings.forEach(createBookingCard);
        updateStats(); // Update stats with initial data
    });

    // Fired every time a new booking is generated on the server
    socket.on('new-booking', (booking) => {
        allBookings.unshift(booking); // Add new booking to our local state

        // Remove the oldest booking card from the UI if the list gets too long
        if (allBookings.length > 20) {
            const oldBooking = allBookings.pop();
            const oldCard = document.getElementById(`booking-${oldBooking.id}`);
            if (oldCard) oldCard.remove();
        }

        createBookingCard(booking); // Add the new card to the UI
        updateStats(); // Recalculate and display the new stats
        showToast(booking); // Show a notification
    });

    // Initial call to render any hardcoded Lucide icons on the page
    lucide.createIcons();
});