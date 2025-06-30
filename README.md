# WaSh-it
Laundry booking system for NUS dormitories

## Table of Contents
- [Project Overview](#project-overview)
- [Motivation](#motivation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Timeline](#timeline)
- [User Stories](#user-stories)
- [Test Guide](#test-guide)

## Project Overview
**WaSh-it** is a dormitory laundry management system that enables:
- Real-time machine availability tracking
- Advanced slot booking
- Smart notifications
- Usage analytics for administrators

**Achievement Level**: Project Gemini  
**Team**: WaSh-it

## Motivation
> "Carrying heavy laundry only to find all machines occupied made me think 'WaSh-it'..."

Our system solves:
- Wasted trips to laundry rooms
- Poor machine utilization
- Scheduling conflicts in dorms

## Features
### Core
- Real-time machine status dashboard  
- 2-hour slot booking system  
- SMS/email notifications  
- Admin analytics portal  

### Extensions
- NUSNET authentication  
- Automatic waitlist  

## Tech Stack
**Frontend**: React.js
**Backend**: Node.js/Express.js  
**Database**: PostgreSQL  
**DevOps**: Heroku + GitHub Actions  

## Timeline
| Milestone | Date | Deliverables |
|-----------|------|--------------|
| Proof of Concept | Jun 2 | Basic machine status UI |
| Core Prototype | Jun 30 | Booking + Notification system |
| Extended System | Jul 28 | User accounts + Waitlist |

## User Stories
- As a *dormitory resident* who wants to do laundry, I want to be able to check machine availability before carrying my laundry, so that I don’t waste time and effort. 

- As a *NUS student and dormitory resident* who is incredibly busy and wants to avoid waiting, I want to book a laundry machine in advance so that I can plan my time efficiently. 

- As a *resident who has a booking*, I want to be able to receive a notification when my laundry slot is about to start or end so that I don’t forget my laundry. 

- As a *dormitory administrator*, I want to monitor machine usage for each individual(and also the general population) and detect potential misuse so that the laundry system remains fair for all residents. 

## Test Guide

### 1. Setup Repository

1. Create an empty folder.
2. Open **Git Bash** inside the folder.
3. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/aurorazurary/Orbital2025_WaSh-it.git
   ```

4. Open the `Orbital2025_WaSh-it` folder in your IDE.

---

### 2. Start the Backend

1. Open a terminal in your IDE.
2. Navigate to the `server` folder:

   ```bash
   cd server
   ```

3. Load test data:

   ```bash
   node testData.js
   ```

4. Start the backend server:

   ```bash
   node index.js
   ```

---

### 3. Start the Frontend

1. Open another terminal.
2. Navigate to the `client` folder:

   ```bash
   cd client
   ```

3. Start the frontend:

   ```bash
   npm start
   ```

---

### 4. Use the Web App
- It should open your default browser and start automatically
- If it doesn't start automatically
  - Open your browser and go to: [http://localhost:3000](http://localhost:3000)
  - You can now test the **WaSh-it** web app!
