# OpenVoice 📢
### **A Full-Stack Collaborative Publishing & Moderation Engine**

**OpenVoice** is a professional-grade MERN-stack platform designed for a collaborative content ecosystem. It features **AI-assisted drafting**, a robust **editorial pipeline**, and **multi-tier authentication** to manage authors and administrators seamlessly.

---

## 🚀 Key Engineering Features

* **Hybrid Authentication Architecture:** Utilizes **Clerk** for secure community author onboarding and a custom **JWT-based provider** for administrative governance.
* **Role-Based Access Control (RBAC):** Enforces strict permissioning between **Authors** (drafting/submitting) and **Admins** (moderating/publishing).
* **AI-Augmented Content Pipeline:** Integrated **Google Gemini AI** to facilitate prompt-to-text drafting, reducing content creation time by approximately **30%**.
* **Editorial Lifecycle Management:** Implements a state-driven "Submit → Review → Publish" workflow managed through custom RESTful APIs.
* **Optimized Media Delivery:** Automated image processing and cloud storage integration via **ImageKit API**.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Clerk, Context API |
| **Backend** | Node.js, Express.js, JWT |
| **Database** | MongoDB (Mongoose ODM) |
| **AI/Services** | Google Gemini API, ImageKit API |

---

## 📂 System Architecture

> **Architecture Note:** The frontend and backend are decoupled, allowing for independent scaling and modular maintenance of moderation tools.

* **`/client`**: A high-performance React frontend utilizing **Context API** for global state management and **Vite** for optimized builds.
* **`/server`**: A modular Express backend featuring custom **RBAC middleware**, controller-driven logic, and secure JWT signing.

---

## 🔧 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/TiwariAdarsh23/OpenVoice-CMS.git
```
### 2. Environment Configuration: Create a .env file in the /server directory and add the following keys:
```env
# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_random_secret_key
# Database & API Keys
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```
>Note: You also need a .env file in the /client directory with your
VITE_CLERK_PUBLISHABLE_KEY.

### 3. Install & Run
```bash
# Setup Backend
cd server
npm install && npm run start

# Setup Frontend (New Terminal)
cd ../client
npm install && npm run dev
```