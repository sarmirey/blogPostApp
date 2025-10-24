# Blog Post Application

## Description

This Full Stack Blog Post Application allows users to create, edit, delete, and search blog posts. It also supports pagination to navigate through multiple posts efficiently.

## Features

- Create blog posts
- Edit existing posts
- Delete posts
- View all blog posts
- Search for blog posts
- Paginate blog posts

## Technologies Used

- Node.js
- Express
- MongoDB
- React.js
- Material-UI
- Axios

**Backend:**  
I started with the backend to ensure API endpoints were ready for frontend integration. I used **Node.js** and **MongoDB** for a consistent JavaScript stack. **Express** simplified building endpoints and managing routes while keeping the MVC structure clean. I created **models** to define database schemas and **controllers** to handle business logic. **Mongoose** provided convenient methods for querying, inserting, and updating data, enabling a structured, maintainable approach to database management.

**Frontend:**  
I used **Material-UI** to quickly build a clean, consistent UI and focused on full-stack integration. **Axios** simplified API requests (GET, POST, PUT, DELETE). I bootstrapped the project with **Vite** for faster builds. I preferred **functional components** for easier use of state and useEffect hooks. If I had more time, I would refactor forms for creating and editing posts into a single dynamic component and improve mobile responsiveness using Material-UI’s built-in features.

**Other Decisions:**

- **Search & Pagination:** Implemented on the backend to ensure users always receive the most up to date data.
- **Individual Blog Posts:** Opened on a separate page for better UX and shareability, rather than a modal.
- **Create Post:** Implemented as a modal for simplicity, but a dedicated page would be better for production.

---

## Installation

### MongoDB Setup

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (skip if using provided credentials).
2. Create a new project (ex `BlogPostApp`) and set your member access permissions.
3. Create a cluster (Free Tier) and click **Create Cluster**.
4. Connect to the cluster:
   - Create a MongoDB user with a username and password (save these).
   - Select **Connect -> Drivers** to get a connection string:
     ```
     mongodb+srv://<db_username>:<db_password>@cluster0.rlzjvyi.mongodb.net/?appName=Cluster0
     ```

---

### Server Setup

1. Navigate to the root directory of the project:
   cd blog-post-app
2. Create a config.env file in the root directory with the following content:
   ```bash
   PORT=8000
   ENV=development
   DATABASE_CONNECTION=""
   DATABASE_USERNAME=""
   DATABASE_PASS=""
   ```
3. Replace the placeholders:

- DATABASE_USERNAME and DATABASE_PASS → your MongoDB credentials
- DATABASE_CONNECTION → the connection string from MongoDB Atlas
- Do not replace <db_password>, as server.js will handle it automatically
- Replace mongodb.net/ with mongodb.net/<Project_Name> where <Project_Name> is your MongoDB project name

4. Install sever dependencies

- npm install

5. Start the server

- npm run start

### RUN SCRIPT TO FILL IN MONGODB WITH DATA

1. cd server/script
2. Run node script.js

- Should get

```bash
Data successfully deleted!
Data successfully loaded!
```

### Client Setup

1. Run depedencies, go to root directory

- npm install

2. Run the development server

- npm run start
