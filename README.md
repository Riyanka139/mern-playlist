# Music Playlist System

A music playlist system that allows users to create and manage their own playlists, with integration to search for songs via the Spotify API. The system offers a seamless user experience with secure login and dashboard functionality.

## Features

- **Login & Register**: Secure authentication for users.
- **Dashboard**: View and manage your playlists.
- **Protected Routes**: Ensures that users are authenticated before accessing certain pages.
- **Search Songs**: Search for songs using the Spotify API.
- **Add Songs to Playlist**: Add searched songs directly to your playlists.
- **Responsive UI/UX**: Login, Resigter and dashboard Page with a clean and responsive design using React and a CSS framework (e.g., Material UI).

## Tech Stack

- **Frontend**:
  - React
  - React Router
  - Tailwind
  - Axios
  - mui
  - TypeScript

- **Backend**:
  - Node.js
  - Express
  - Mongoose
  - Spotify API
  - Nodemon
  - bcrypt
  - JWT Web Token

- **Database**:
  - MongoDB

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Riyanka139/mern-playlist.git
    cd mern-playlist
    ```

2. **Backend Setup**:

    - Navigate to the backend directory:
      ```bash
      cd server
      ```
      
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```env
      MONGO_URI = your-mongodb-connection-string
      PORT=4000
      SPOTIFY_CLIENT_ID=your-spotify-client-id
      SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
      JWT_SECRET=your-jwt-secret
      SPOTIFY_API_URL = 'https://api.spotify.com/v1'
      ```
      
    - Install backend dependencies:
      ```bash
      npm install
      ```
      
    - Start the backend server:
      ```bash
      node index.js or npm start
      ```

3. **Frontend Setup**:

    - Navigate to the frontend directory:
      ```bash
      cd client
      ```
      
    - Install frontend dependencies:
      ```bash
      npm install
      ```
      
    - Start the frontend development server:
      ```bash
      npm start
      ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on the "Link Google Drive" button to authenticate and connect your Google Drive account.
3. View the analytics on the dashboard including file types, file sizes, file list, and unique people with access.
4. To revoke access, click on the "Revoke Access" button.

## Folder Structure
 ```bash
gdrive-mb-riyanka-challenge-full-stack/
├── server/
│ ├── index.js
│ ├── models/
│ ├── controller/
│ ├── middleware/
│ ├── routes/
│ ├── services/
│ └── .env
│ ├── package.json
│ └── .gitignore
├── client/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── component/ # Component files
│ │ ├── pages/ # Page files
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── index.css
│ └── theme.js
├── .gitignore
├── package.json
└── README.md
```

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Material UI](https://mui.com/material-ui/)


