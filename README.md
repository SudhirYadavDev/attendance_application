# Attendance Management System

## Live Links

Frontend: https://attendance-frontend1.netlify.app  
Backend: https://attendance-backend-x6cn.onrender.com  

---

## Test Accounts

Use the following test accounts to verify all roles:

- Student: student_1  
- Trainer: trainer_1  
- Institution: institution_1  
- Programme Manager: pm_1  
- Monitoring Officer: monitor_1  

Note: These are Clerk User IDs used for login in the system.

## Project Overview

This is a full-stack Attendance Management System.

The system supports five roles:

- Student
- Trainer
- Institution
- Programme Manager
- Monitoring Officer

Each role has a dedicated dashboard with role-based access control enforced at the backend.

---

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router

Backend:
- Spring Boot
- Spring Data JPA
- PostgreSQL (Neon)

Deployment:
- Frontend: Netlify
- Backend: Render
- Database: Neon PostgreSQL

---

## Features

### Authentication & Roles
- Users sign up with a selected role
- Backend validates role on every request
- Role-based routing after login

### Student
- View sessions
- Mark attendance (Present / Absent / Late)

### Trainer
- Create sessions
- View session attendance
- Generate batch invite link

### Institution
- Create batches
- View batch attendance summaries

### Programme Manager
- View institution-level summaries

### Monitoring Officer
- Read-only global attendance dashboard

---

## Database Entities

- users
- batches
- batch_trainers
- batch_students
- sessions
- attendance

---

## API Endpoints (Core)

### Users
- POST /users
- GET /users/{clerkUserId}

### Batches
- POST /batches
- POST /batches/{id}/invite
- POST /batches/{id}/join
- GET /batches/{id}/summary
- GET /batches/programme/summary
- GET /batches/institutions/{id}/summary

### Sessions
- POST /sessions
- GET /sessions/student
- GET /sessions/trainer

### Attendance
- POST /attendance/mark
- GET /attendance/my
- GET /attendance/session/{id}
- GET /attendance/sessions/{id}/attendance

---

## Setup Instructions

### Backend
```bash
cd attendance-system
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd attendance-frontend
npm install
npm run dev
```

### Environment Variables (Backend)
```bash
SPRING_DATASOURCE_URL=your_neon_url
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
PORT=8080
```

---

### What is Working
```bash
Role-based login and routing
Student attendance marking
Trainer session management
Batch creation and invites
Institution and programme summaries
Monitoring officer dashboard
Fully deployed frontend and backend
```

### Limitations
```bash
Basic UI (focus on functionality)
No real-time updates
Simple token-based invite system
```

### Notes
```bash
Backend validates roles on every request (not frontend-only)
Attendance and batch relationships are fully relational
System is fully deployed and connected to PostgreSQL
```

---

## 7. One thing I would do differently with more time
```bash
If I had more time, I would improve the system by introducing a more robust authentication and authorization layer using Clerk session verification on the backend for every request. Currently, role-based access is handled correctly, but I would further strengthen security by adding token validation middleware and finer-grained permission checks per endpoint.

Additionally, I would refactor the frontend into a more modular architecture with reusable UI components and add better state management (such as Redux or React Query) to improve scalability and reduce repeated API calls.

Finally, I would enhance the UI/UX with better loading states, error handling components, and real-time attendance updates using WebSockets so that trainers and students can see updates instantly without refreshing.
```

---
Thanks for checking out Attendance Management Application!

---
Give this repo a ⭐ if it helped you!

<p align="center">Made with ❤️ by Sudhir Yadav</p>
