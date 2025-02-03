# Full-Stack Chat Application (MERN STACK)

This project consists of a full-stack application with a React frontend and a Node.js backend. Below is a detailed explanation of each part.

## Project Structure

### Client (Frontend)

Located in the `client/` directory, the frontend is built with React, TypeScript, and Vite.

- **src/**: Contains the source code for the React application.
  - **components/**: Reusable UI components like `Button`, `Input`, `Textarea`, and `ScrollArea`.
  - **lib/**: Utility functions like `cn` for class name merging.
  - **assets/**: Static assets.
  - **App.tsx**: The main application component that renders the `Chat` component.
  - **main.tsx**: Entry point for the React application.
  - **index.css**: Global CSS styles.
  - **vite-env.d.ts**: TypeScript definitions for Vite.
- **public/**: Contains public assets like `index.html`.
- **package.json**: Dependencies and scripts for the frontend.
- **Dockerfile.react**: Dockerfile for building the React application.


### Server (Backend)

Located in the `server/` directory, the backend is built with Node.js, Express, and TypeScript.

- **src/**: Contains the source code for the Node.js application.
  - **app.ts**: Sets up the Express application and Socket.IO server.
  - **index.ts**: Entry point for the Node.js application.
  - **config/**: Configuration files like `mongo.ts` for MongoDB connection.
  - **controllers/**: Handles logic like `botController.ts` for bot commands.
  - **models/**: Mongoose models like `Calculation.ts`.
  - **services/**: Service functions like `CalculatorService.ts`, `saveCalculations.ts`, and `getCalculations.ts`.
  - **tests/**: Contains test files like `calculatorService.test.ts`.
- **package.json**: Dependencies and scripts for the backend.
- **Dockerfile.node**: Dockerfile for building the Node.js application.
- **tsconfig.json**: TypeScript configuration for the backend.
- **.env**: Environment variables for the backend.

### Docker Setup

- **docker-compose.yaml**: Defines services for the frontend (`react-app`), backend (`node-server`), and MongoDB (`mongo`). It also includes a `test-node-server` service for running backend tests.
- **Dockerfiles**: Define how to build Docker images for the frontend and backend.

## Functionality

### Frontend

The React application provides a chat interface where users can send messages. It uses Socket.IO to communicate with the backend in real-time.

- **Chat Component**: Handles user input and displays messages. It uses `Button`, `Input`, and `ScrollArea` components for the UI.
- **UI Components**: Reusable components styled using Tailwind CSS.

### Backend

The Node.js application handles incoming messages, performs calculations, and stores/retrieves calculation history from MongoDB.

- **Socket.IO**: Listens for messages from the frontend and processes commands like `history` to fetch calculation history or mathematical expressions to evaluate.
- **CalculatorService**: Evaluates mathematical expressions.
- **MongoDB**: Stores calculation history using Mongoose models.

## Running the Project

1. **Build and Start Services**: Use Docker Compose to build and start the services.
   ```sh
   docker-compose up --build
   ```
2. **Access the Application**:
   - React application: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

This project demonstrates a full-stack application with real-time communication, mathematical expression evaluation, and persistent storage using MongoDB.

