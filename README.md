# TODO Application

A simple TODO application with both frontend and backend components. Users can manage their TODO items with full CRUD functionality.

- Todo landing page
![Capture](https://github.com/user-attachments/assets/ed5512a0-852e-4d7a-865a-e2a59132191b)

- Add Todo page
![Capture1](https://github.com/user-attachments/assets/e46d0c63-af20-4c7d-bf31-77b44145c5fe)

- Todo
![Capture2](https://github.com/user-attachments/assets/95f947cb-db68-4822-a68b-bc2322ce1dcf)

- Todo Edit page
![Capture3](https://github.com/user-attachments/assets/5ce4e489-a4d2-4c75-a405-e3fd042ccb19)


## Features

- Create, read, update, and delete TODO items.

## Tech Stack

### Frontend



- **Framework**: React
- **Styling**: CSS
- **State Management**: Recoil
- **HTTP Client**: Axios

### Backend

- **Language**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Setup

### Frontend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app/frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3.**Start the development server**
  ```bash
    npm run dev
  ```
### Backend

1. **Navigate to the backend directory:**
   ```bash
   cd todo-app/backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3.**Create a .env file and add your environment variables:**
  ```bash
  PORT=5000
  ```
4.**Create a config.js file and add your JWT_SECRET:**
  ```bash
  JWT_SECRET = ''
  ```
5.**Start the server:**
  ```bash
    node index.js
  ```
The backend will be available at http://localhost:3000
### Usage
- Open the frontend application in your web browser.
- Interact with the interface to manage TODO items.
- The backend server will handle API requests and manage data.
