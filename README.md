# 🎫 Ticket Management Web App (React Version)

This is the **React implementation** of the Ticket Management Web Application challenge.  
It provides a complete frontend system for managing support tickets — featuring authentication, a responsive dashboard, and full ticket CRUD functionality — all with a clean, consistent UI.

---

## 🚀 Overview

The **Ticket Management App** allows users to:
- Create, edit, view, and delete support tickets.
- Log in and sign up securely (simulated authentication).
- View summary statistics on the dashboard.
- Toggle between light and dark modes.
- Stay authenticated using a simulated session token in `localStorage`.

This version was built entirely with **React**, following the same design and layout rules required for the React, Vue.js, and Twig implementations.

---

## 🧠 Core Features

### 1. Landing Page
- Wavy hero section using **CSS clip-path**.
- Decorative circles for visual appeal.
- Responsive max-width layout (1440px).
- Call-to-action buttons — “Login” and “Get Started”.
- Consistent footer across all pages.

### 2. Authentication (Login & Signup)
- Inline form validation (empty fields, password mismatch, etc.).
- Error and success feedback messages.
- Stores users and sessions in `localStorage`.
- Session key: `ticketapp_session`.
- Redirects unauthorized users to `/auth/login`.

### 3. Dashboard
- Displays total, open, and closed ticket counts.
- Provides navigation links to the Ticket Management screen.
- Logout button clears session and redirects to the login screen.

### 4. Ticket Management (CRUD)
- **Create**: Add a new ticket with title, description, and priority.
- **Read**: Display a list of tickets in card format.
- **Update**: Edit existing ticket details.
- **Delete**: Remove a ticket with confirmation.
- **Status Control**: Toggle between `open → in_progress → closed`.
- Tickets saved persistently in `localStorage`.
- Inline validation for required fields.
- Dark mode toggle for user customization.

---

## 🧰 Tech Stack

| Purpose | Library / Tool |
|----------|----------------|
| Framework | React (Vite or CRA) |
| Styling | CSS Modules / Inline styles |
| Routing | React Router DOM |
| State Management | React useState / useEffect |
| Data Storage | localStorage |
| Notifications | Inline messages (toasts optional) |

---

## ⚙️ Setup & Usage

### Prerequisites
- Node.js ≥ 16
- npm or yarn

### Installation Steps
```bash
# 1️⃣ Clone the repository
git clone <[https://github.com/MickGared/HNG-Stage-2-Task-React.git]>

# 2️⃣ Navigate into the React app
cd ticketapp-react

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm start
