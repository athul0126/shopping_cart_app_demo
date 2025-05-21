# MERN Shopping Cart Application

A full-featured shopping cart application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Product catalog with filtering and search
- Shopping cart functionality
- User authentication (register/login)
- Checkout process
- Order history and details
- Admin panel for product, order, and user management
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Lucide React for icons
- React Hot Toast for notifications
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/mern-shopping-cart.git
cd mern-shopping-cart
```

2. Install dependencies
```
npm run install:all
```

3. Set up environment variables
   - Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Seed the database
```
cd backend
node seeder.js
```

5. Start the development server
```
cd ..
npm run dev
```

## Usage

### Default Users
- Admin User:
  - Email: admin@example.com
  - Password: 123456
- Regular User:
  - Email: john@example.com
  - Password: 123456

### Admin Features
- Product management (add, edit, delete)
- Order management
- User management

## Project Structure

```
mern-shopping-cart/
├── backend/             # Node.js server
│   ├── data/            # Seed data
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── frontend/            # React frontend
│   ├── public/          # Static assets
│   └── src/             # React components and logic
│       ├── components/  # Reusable components
│       ├── context/     # React Context state
│       ├── pages/       # Page components
│       └── services/    # API service layer
└── package.json         # Project configuration
```

## License

MIT License