# Country Info App

This project consists of two parts:
- **Server**: A Node.js backend API that provides country data.
- **Client**: A React frontend that displays country information based on data fetched from the server.

## Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js** (version >= 14.x.x)
- **npm** (Node Package Manager) or **yarn**
- **Git** (for cloning the repository)

## Setup Instructions

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
    git clone <https://github.com/Blaxwo/Country-Info-App>
    cd Country-Info-App
   ```

### Step 2: Set Up the Server

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm run start
    ```

   By default, the server will run on `http://localhost:3001`.

4. If you want to run the server in development mode (with automatic restarts on file changes), use:

    ```bash
    npm run dev
    ```

### Step 3: Set Up the Client

1. Navigate to the `client` folder:

    ```bash
    cd ../client
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

   The client application will run on `http://localhost:3000` by default.

4. Open a browser and navigate to `http://localhost:3000` to view the app.
