# Data Ingestion Application (ClickHouse to Flat File & Flat File to ClickHouse)

This web-based application facilitates bidirectional data ingestion between a **ClickHouse** database and a **Flat File (CSV)**. It supports both **ClickHouse to Flat File** and **Flat File to ClickHouse** ingestion. The application also handles **JWT token-based authentication** for ClickHouse as a source and allows users to select specific columns for ingestion.

---

## Core Features

- **Bidirectional Data Flow**: Transfer data between ClickHouse and flat files.
- **ClickHouse Integration**: JWT token-based authentication for accessing ClickHouse.
- **Flat File Integration**: Support for CSV files.
- **Schema Discovery & Column Selection**: Discover available schemas, list columns, and select columns for ingestion.
- **Error Handling**: User-friendly error handling for connection, authentication, and ingestion issues.
- **Completion Reporting**: Displays the total number of records processed during ingestion.

---

## Prerequisites

Before running this application, make sure you have the following installed:

### Backend (Node.js)
- **Node.js** (v14.x or later) - Install from [nodejs.org](https://nodejs.org/).
- **NPM** (comes with Node.js) - For managing backend dependencies.

### Frontend (React.js)
- **React.js** - For building the frontend interface.
- **npm** or **yarn** - For managing frontend dependencies.

### ClickHouse
- A running **ClickHouse** instance (either local or cloud-based). You can use **Docker** to run ClickHouse locally for testing.
- Example datasets like `uk_price_paid` and `ontime` can be used for testing.

---

## Installation Steps

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/data-ingestion-app.git
cd data-ingestion-app


2. Backend Setup (Node.js)
Install Node.js from nodejs.org (if you haven't already).

Navigate to the backend directory and install the required dependencies:

bash
cd backend
npm install
Create an .env file in the backend/ directory and configure the environment variables for ClickHouse:

env
CLICKHOUSE_HOST=your_clickhouse_host
CLICKHOUSE_PORT=your_clickhouse_port
CLICKHOUSE_DATABASE=your_clickhouse_database
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
npm start
By default, the backend server will run at http://localhost:5000 (or the port you specify in the .env file).

3. Frontend Setup (React.js)
Navigate to the frontend/ directory:

bash
cd frontend
Install the frontend dependencies:

bash
npm install
Start the React development server:

bash
npm start
This will start the frontend at http://localhost:3000.

4. ClickHouse Setup (For Local Development)
If you're using Docker to run ClickHouse locally, follow these steps:

Install Docker from docker.com.

Pull the official ClickHouse Docker image:

bash
docker pull yandex/clickhouse-server
Run ClickHouse locally:

bash
docker run --name clickhouse -d -p 9000:9000 -p 9440:9440 yandex/clickhouse-server
You can access ClickHouse at localhost:9000 or localhost:9440 (for HTTPS).

5. JWT Token Authentication
Ensure you have a valid JWT token for authentication when using ClickHouse as a source.

The frontend will prompt you for the JWT token when selecting ClickHouse as the data source.

6. Flat File Setup
The frontend allows users to upload CSV files. Make sure you have a local CSV file ready for testing the Flat File to ClickHouse ingestion.

Usage
1. Launch the Application
Backend: Run the Node.js backend server:

bash
npm run start  # In the backend directory
Frontend: Run the React frontend:

bash
npm start  # In the frontend directory
This will start the frontend at http://localhost:3000 and the backend at http://localhost:5000.

2. Open the Web UI
Visit http://localhost:3000 in your browser to use the application.

3. Select Data Source
ClickHouse: Enter the connection details (Host, Port, Database, User, and JWT Token).

Flat File: Upload a CSV file and specify the delimiter (comma, semicolon, etc.).

4. Schema Discovery & Column Selection
Once connected to the data source, the application will fetch available tables (for ClickHouse) or schema information (for Flat File).

The UI will display the columns, and users can select the columns they want to ingest.

5. Data Ingestion
Click on the "Start Ingestion" button to begin transferring data between the selected sources (ClickHouse to Flat File or Flat File to ClickHouse).

The UI will show the number of records processed once the ingestion is complete.

6. Error Handling
The application will display user-friendly error messages for issues such as:

Connection errors

Authentication failures

Ingestion issues

Testing
The application includes several test cases:

ClickHouse -> Flat File: Verify the record count after ingestion.

Flat File -> ClickHouse: Verify the record count and data integrity after ingestion.

Multi-Table Join (Bonus): Allow selection of multiple ClickHouse tables and perform joins for ingestion.

Authentication Failures: Test with incorrect JWT tokens or connection failures.

Data Preview: Preview the first 100 rows of data before performing full ingestion.

Example Datasets
For testing purposes, you can use ClickHouse example datasets like:

UK Price Paid

Ontime