# Crowd Management System – Frontend

This project is a **frontend web application** developed using **pure HTML, CSS, and Vanilla JavaScript**.  
It consumes backend APIs to display crowd analytics such as live occupancy, footfall, dwell time, demographics, and visitor entry/exit records.

---

# Tech Stack
- HTML5
- CSS3
- JavaScript
- Fetch API for backend communication



---

## Project Structure


crowd-management-frontend/
│
├── index.html # Login page
├── dashboard.html # Dashboard (Overview + Charts)
├── entries.html # Crowd Entries page
│
├── css/
│ └── style.css # All styles
│
├── js/
│ ├── login.js # Login API integration
│ ├── dashboard.js # Dashboard summary APIs
│ ├── charts.js # Canvas-based charts
│ └── entries.js # Crowd entries + pagination
│
├── assets/
│ └── images/
│
└── README.md


##  How to Run the Project

### Simple (Recommended for demo)
1. Extract the ZIP file
2. Open `index.html` in a modern browser (Chrome / Edge)

## then open

http://localhost:3000   (or the port shown)




## Authentication Flow

User logs in via Login API

On success, auth token is stored in localStorage

Protected pages (dashboard.html, entries.html) require token

Logout clears token and redirects to login page


## API Integrations Used

All APIs are consumed using POST requests with fetch().

Login

POST /api/auth/login


Dashboard Analytics

POST /api/analytics/occupancy
POST /api/analytics/footfall
POST /api/analytics/dwell


Demographics

POST /api/analytics/demographics


Crowd Entries (Paginated)

POST /api/analytics/entry-exit


API URLs are already configured in the JavaScript files.

## Charts Implementation

Charts are rendered using HTML <canvas>

Custom JavaScript drawing logic

No external charting libraries used

Charts included:

Occupancy Time-Series Line Chart

Demographics Donut Chart

Male vs Female Line Chart

## Features Implemented

Secure login

Dashboard overview cards

Real-time analytics via APIs

Canvas-based charts

Crowd entries table

Pagination

Logout handling

Responsive layout (desktop)
