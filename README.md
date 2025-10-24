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
