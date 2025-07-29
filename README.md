# Live Bookings Viewer

A real-time web application that displays new bookings as they are generated on the server. This project uses **Node.js**, **Express.js**, and **Socket.IO** for the backend, and standard **HTML, CSS, and JavaScript** for the frontend.

## Requirements

* Node.js (version 14 or higher is recommended)
* npm (comes bundled with Node.js)

---

## Installation

1.  **Clone the Repository**
    Open your terminal, navigate to the directory where you want to save the project, and run the following command:
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd live-bookings-viewer
    ```

3.  **Install Dependencies**
    This command will install the necessary packages for the server (Express and Socket.IO).
    ```bash
    npm install
    ```

---

## Execution

To run the application, you need to start the backend server. The server is responsible for both generating the mock bookings and serving the frontend files.

1.  **Start the Server**
    In your terminal, from the root of the project directory, run the following command:
    ```bash
    npm start
    ```
    You will see a confirmation message in the terminal:
    `Server is running on http://localhost:3000`

2.  **View the Frontend**
    Open your web browser (like Chrome, Firefox, or Safari) and navigate to the following address:
    [http://localhost:3000](http://localhost:3000)

The "Live Bookings Viewer" dashboard will load, and new bookings will automatically appear at the top of the list every 5 seconds without needing a page refresh.