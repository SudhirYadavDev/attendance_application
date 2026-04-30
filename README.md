# Attendance Management System

## Live Links

Frontend: https://attendance-frontend1.netlify.app  
Backend: https://attendance-backend-x6cn.onrender.com  

---

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
