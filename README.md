# Status

Status is a modern, lightweight, and open-source status page application designed for small businesses and creators. It features a stunning dark-themed dashboard, historical uptime tracking, and instant alerts.

## Features
- **Real-time Monitoring**: Polls services every 5 minutes.
- **Beautiful Dashboard**: Premium dark-mode UI with sparkline history.
- **Instant Alerts**: Notification support (configurable).
- **Theme Customization**: Adjust colors to match your brand.
- **Self-Hostable**: Built with Node.js, SQLite, and React (Vite).

## Quick Start

### Prerequisites
- Node.js (v18+)
- NPM

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bradlot/status.git
   cd status
   ```

2. **Install Dependencies**
   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

3. **Start the Application**
   You need to run both the server and client.

   **Terminal 1 (Backend)**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 (Frontend)**
   ```bash
   cd client
   npm run dev
   ```

4. **Access Status**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration
- **Add Services**: Use the "+ Add Service" button on the dashboard.
- **Theme**: Click the 🎨 icon in the bottom right to customize colors.

## License
MIT
