
# Travel Logger - Travel Photo Journal

Travel Logger is a web-based applicaiton designed for users to record and share their travel
experiences through journal entries and photographs with the use of location and tags.
Users may share their entries with others or keep them private for their own personal use.
Travel Logger offers an interface that is easy for users to use so that they can focus on
their journaling experiences. Each entry allows users to add photos, write about their own experiences, add a location and tags to their entries that can help catergorise ther travel experiences.

---

## Public URL

Public URL: http://52.63.112.90

---

## Project Access

---

## Project Setup Instructions

### Prerequisites
- Node.js
npm
MongoBD Account

### 1. Clone Repository
```bash
git clone https://github.com/RobinLopezLoo/IFQ636-AS1-2.git
cd IFQ636-AS1-2
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a '.env' file in the 'backend' folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001


Start the Backend:
```bash
npm start
```


### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm start
```

App will open at 'http://localhost:3000'


### 4. Running Test
```bash
cd backend
npm test
```


## Website Features
- Users can register and login with JWT authentication
- Users can create, view, edit and delete travel journal entries from the dashboard and journal pages



## Test account
Username: test@gmail.com
Password: password
