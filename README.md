Veo - Secure Voting Platform 

Veo is an open-source voting platform designed for creating, managing, and analyzing time-bound polls. Built with modern web technologies, it combines a React.js frontend with a Spring Boot backend to deliver a secure, scalable solution for real-time democratic decision-making.
Key Features ✨

    Poll Management
    Create polls with custom voting options and expiration dates

    Real-Time Analytics
    Live vote tracking with dynamic visualizations

    JWT Authentication
    Secure user sessions with JSON Web Tokens

    Role-Based Access Control
    Granular permissions for users and administrators

    Responsive Interface
    Mobile-first design optimized for all devices

    Automated Expiration
    Scheduled poll termination via Spring Boot tasks

Architecture 🏗️
Component	Technology Stack
Frontend	React.js, Axios, Shadcn UI
Backend	Spring Boot, Spring Security, Spring Data JPA
Database	PostgreSQL
Authentication	JWT
Build Tools	Maven, npm
Installation Guide 📥
Prerequisites

    Node.js v16+ & npm

    Java 17+ & Maven

    PostgreSQL 14+

Setup Instructions

    Clone Repository
    bash
    Copy

    git clone https://github.com/winnerezy/veo.git
    cd veo

    Database Configuration

        Create PostgreSQL database:
        sql
        Copy

        CREATE DATABASE veo;

    Backend Setup
    bash
    Copy

    cd backend
    # Configure application.properties
    mvn clean install
    mvn spring-boot:run

    Frontend Setup
    bash
    Copy

    cd frontend
    npm install
    npm start

Configuration ⚙️
Environment Variables

Backend (application.properties):
properties
Copy

spring.datasource.url=jdbc:postgresql://${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}
spring.datasource.username=${POSTGRES_USERNAME}
spring.datasource.password=${POSTGRES_PASSWORD}
security.jwt.secret-key=${JWT_SECRET}
security.jwt.expiration=86400000  # 24 hours

API Documentation 📚
Authentication
Endpoint	Method	Description
/api/auth/signup	POST	User registration
/api/auth/login	POST	User authentication
Poll Management
Endpoint	Method	Description
/api/polls	GET	List active polls
/api/polls/create	POST	Create new poll (authenticated)
/api/polls/{id}	GET	Get poll details
/api/polls/{id}/vote/{optonId}	POST	Submit vote
