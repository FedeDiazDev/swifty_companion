# Swifty Companion

A React Native application (using Expo) that allows users to search for peers from 42 School and view their detailed profiles, including skills, projects, and coalition information.


## Features

- **Authentication**: Secure login using 42 API credentials.
- **Peer Search**: Search for students by their login.
- **User Profile**: Detailed view of user statistics, including:
  - Wallet and Correction Points.
  - Cursus Level and Black Hole days remaining.
  - Skills breakdown with progress bars.
  - Recent Projects status (Success, Failure, In Progress).
- **Coalition Support**: Displays user's coalition background and styling.
- **Dark Mode**: Sleek dark-themed UI.

## Screenshots

| Login Screen | Search Screen |
|:---:|:---:|
| ![Login](/assets/screenshots/login.jpeg) | ![Search](/assets/screenshots/search.jpeg) |

| User Profile | Projects & Skills |
|:---:|:---:|
| ![Profile](/assets/screenshots/profile.jpeg) | ![Details](/assets/screenshots/details.jpeg) |


## Getting Started

### Prerequisites

- Docker & Docker Compose (Recommended)
- OR Node.js & npm/yarn

### Running with Docker (Recommended)

This project includes a Docker configuration for easy setup.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/swifty-companion.git
    cd swifty-companion
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file (if not present) or ensure your environment variables are set in `docker-compose.yml`.
    ```env
    EXPO_PUBLIC_UID=your_42_api_uid
    EXPO_PUBLIC_SECRET=your_42_api_secret
    ```

3.  **Start the container:**
    ```bash
    docker-compose up --build
    ```

4.  **Scan the QR Code:**
    The terminal will display a QR code. Scan it with the **Expo Go** app on your Android/iOS device.
    *Note: The Docker setup uses a tunnel to make the connection easier.*

### Running Locally

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the app:**
    ```bash
    npx expo start
    ```

## Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Styling**: NativeWind (TailwindCSS)
- **Navigation**: Expo Router
- **API**: 42 API
