
#  Dev Pulse

> **Internal Tech Issue & Feature Tracker**
> A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions efficiently.

🔗 **Live Application URL:** *[Insert Live URL Here]*

---

## ✨ Features

* **Secure Authentication:** User signup and login functionality utilizing JWT tokens.
* **👥 Role-Based Access Control (RBAC):** Supports two distinct roles: `contributor` and `maintainer`.
* **📝 Issue Management:** Authenticated users can easily create, view, and update issues (bug reports or feature requests).
* **🛡️ Secure Operations:** - Anyone with an account can edit an issue.
* Only users with the `maintainer` role have the permission to permanently delete issues.


* **🔍 Advanced Retrieval:** Get all issues with built-in optional sorting and filtering mechanisms.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **Database:** Neon Db

---

## 🚀 Getting Started & Setup

Follow these simple steps to clone, configure, and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Fahmid-run/Devpulse.git
cd Devpulse

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure your environment variables (Database credentials, JWT secret, Port, etc.):

```env
PORT= 2000

JWT_SECRET=your_jwt_secret_key_here
CONNECTION_STRING=your_database_connection _string_here

JWT_SECRET=your_jwt_secret_key_here

JWT_REFRESH_SECRET=your_jwt_Refresh_secret_key_here

```

### 4. Run the Server

**Development Mode (with hot-reloading):**

```bash
npm run dev

```

**Production Build:**

```bash
npm run build
npm start

```

---

## 🔌 API Endpoints

### 🔐 Authentication

| Endpoint | Method | Access | Description |
| --- | --- | --- | --- |
| `/api/auth/signup` | `POST` | Public | Register a new user account with a `contributor` or `maintainer` role. |
| `/api/auth/login` | `POST` | Public | Authenticate a user and receive a secure JWT access token. |

### 🐛 Issue Management

| Endpoint | Method | Access | Description |
| --- | --- | --- | --- |
| `/api/issues` | `POST` | Authenticated | Create a new bug report or feature request. |
| `/api/issues` | `GET` | Authenticated | Retrieve all issues with optional sorting and filtering (e.g., `?sort=newest`). |
| `/api/issues/:id` | `GET` | Authenticated | Retrieve full details of a specific issue by its ID. |
| `/api/issues/:id` | `PATCH` | Authenticated | Update an issue's title, description, or type. |
| `/api/issues/:id` | `DELETE` | **Maintainer Only** | Permanently remove an issue from the system. |

---

## 🗄️ Database Schema Summary

The database structure tracks users and issues. Relationships and logic rules are validated at the application layer.

### 👤 User Schema

| Field Name | Type | Constraints / Description |
| --- | --- | --- |
| `id` | Integer | Auto-incrementing unique identifier. |
| `name` | String | Full display name of the team member. *Required.* |
| `email` | String | Valid login address. *Required, Unique.* |
| `password` | String | Encrypted secure string. Never returned in API responses. *Required.* |
| `role` | String | System access level (`contributor` or `maintainer`). *Defaults to `contributor`.* |
| `created_at` | Timestamp | Automatically generated on account creation. |
| `updated_at` | Timestamp | Automatically refreshed on account updates. |

### 🐛 Issues Schema

| Field Name | Type | Constraints / Description |
| --- | --- | --- |
| `id` | Integer | Auto-incrementing unique identifier. |
| `title` | String | Short descriptive headline. *Required, Max 150 characters.* |
| `description` | String | Detailed explanation of the problem/suggestion. *Required, Min 20 characters.* |
| `type` | String | Categorizes the entry. Must be either `bug` or `feature_request`. |
| `status` | String | Current workflow state (`open`, `in_progress`, `resolved`). *Defaults to `open`.* |
| `reporter_id` | Integer | References the user who submitted the issue. *Validated via application logic.* |
| `created_at` | Timestamp | Automatically generated on issue creation. |
| `updated_at` | Timestamp | Automatically refreshed on issue updates. |

---
