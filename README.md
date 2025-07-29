# Live Bookings Viewer

A real-time web application that displays new bookings as they are generated on the server. This project uses Node.js, Express.js, and Socket.IO for the backend, and standard HTML, CSS, and JavaScript for the frontend.

## Requirements

- Node.js (v14 or higher)
- npm

## Installation

1.  Clone the repository to your local machine.
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate into the project directory.
    ```bash
    cd live-bookings-viewer
    ```
3.  Install the necessary dependencies.
    ```bash
    npm install
    ```

## How to Run

1.  Start the backend server.
    ```bash
    npm start
    ```
2.  The server will start and log a message to the console, like `Server is running on http://localhost:3000`.

3.  Open your web browser and navigate to the address:
    [http://localhost:3000](http://localhost:3000)

You will see the "Live Bookings Viewer" page, and new bookings will appear at the top of the list every 5 seconds without needing a page refresh.