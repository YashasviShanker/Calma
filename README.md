# Calma - AI-Powered Men's Fashion Brand

Calma is a modern e-commerce platform that combines fashion retail with AI-powered styling recommendations. The platform helps users find their perfect style based on their preferences, mood, and occasions.

## Features

- 🏠 Responsive landing page with hero section
- 🔎 Advanced search functionality
- 🛍️ Category-based product browsing
- 🧾 Detailed product pages with image carousel
- 🛒 Shopping cart management
- 🔐 User authentication with JWT
- 🧑‍💼 Admin dashboard for product management
- 🤖 AI Stylist chatbot for personalized recommendations

## Tech Stack

### Frontend

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- React Context for state management

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/calma.git
cd calma
```

2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calma
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the development servers:

```bash
# Start backend server (from root directory)
npm run server

# Start frontend server (from frontend directory)
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
calma/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── types/
│       └── utils/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
