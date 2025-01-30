# Veo

Veo is an open-source voting platform that allows users to create and manage polls with customizable expiration dates. Built with React.js (frontend) and Spring Boot (backend), it’s designed for simplicity, security, and scalability.
Features ✨

    Create Polls: Users can create polls with multiple voting options.

    Expiration Dates: Set a deadline for voting on each poll.

    Real-Time Results: Live updates of vote counts as users participate.

    Authentication: Secure user registration and login (JWT-based).

    Responsive Design: Works seamlessly on desktop and mobile.

    Security: Encrypted API endpoints and role-based access control.

    Admin Dashboard: Manage polls, users, and analytics (optional).

Installation 🛠️
Prerequisites

    Frontend: Node.js (v16+), npm

    Backend: Java 17+, Maven, PostgreSQL

Steps
1. Clone the Repository

``` 
git clone https://github.com/winnerezy/veo.git
cd veo
```

2. Frontend Setup (React.js)
```bash
cd frontend
npm install  # or yarn install
```

3. Backend Setup (Spring Boot)
```
cd backend
mvn clean install
```

4. Configure Environment Variables

Create .env files for backend:

```
spring.datasource.url=jdbc:mysql://localhost:3306/veo?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
security.jwt.secret-key=your_jwt_secret_key_here
security.jwt.expiration=your_expiration_here
```
5. Database Setup

    Install PostgreSQL and create a database named veo.

    Update the application.properties file with your database credentials.

6. Run the Application

Backend (Spring Boot):
```
cd backend
mvn spring-boot:run
```

Frontend (React.js):
```
cd frontend
npm start  # or yarn start
```

The app will be accessible at http://localhost:5173.
Configuration ⚙️
Frontend

    Environment Variables: Customize API endpoints, JWT secrets, and themes in .env.

    Styling: Uses CSS Modules or a UI library (e.g., Material-UI). Modify src/styles/.

Backend

    Security: Configure JWT expiration time in SecurityConfig.java.

    CORS: Update allowed origins in WebConfig.java for cross-origin requests.

    Scheduled Tasks: Poll expiration is handled via Spring Boot’s @Scheduled tasks (see PollScheduler.java).

Tech Stack 🧩
Frontend	Backend
React.js	Spring Boot
Redux (State Mgmt)	Spring Data JPA
Axios (HTTP Client)	Spring Security
Shadcn 
PostgreSQL
JWT Authentication
API Endpoints 📡
Authentication

    POST /api/auth/signup - Register a new user.

    POST /api/auth/login - Authenticate a user.

Polls

    GET /api/polls - Fetch all active polls.

    POST /api/polls/create - Create a new poll (requires authentication).

    PUT /api/polls/{id}/ Fetch a poll data.

Votes

    GET /api/polls/{pollId}/votes/{pollId} - Vote for a specific poll.