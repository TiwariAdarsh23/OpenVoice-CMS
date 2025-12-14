# OpenVoice 📢
A Full-Stack Collaborative Publishing & Moderation System
OpenVoice is a professional-grade MERN-stack platform designed for a collaborative content ecosystem. It features AI-assisted drafting, a robust editorial pipeline, and multi-tier authentication to manage authors and administrators seamlessly.

# 🚀 Key Engineering Features
->Hybrid Authentication Architecture: Utilizes Clerk for secure community author onboarding and a custom JWT-based provider for administrative governance.

->Role-Based Access Control (RBAC): Enforces strict permissioning between Authors (drafting/submitting) and Admins (moderating/publishing).

->AI-Augmented Content Pipeline: Integrated Google Gemini AI to facilitate prompt-to-text drafting, reducing content creation time by approximately 30%.

->Editorial Lifecycle Management: Implements a state-driven "Submit $\rightarrow$ Review $\rightarrow$ Publish" workflow managed through custom RESTful APIs.

->Optimized Media Delivery: Automated image processing and cloud storage integration via ImageKit API.


# 🛠️ Tech Stack
Layer	          Technologies
Frontend	      React.js, Tailwind CSS, Clerk, Context API
Backend	          Node.js, Express.js, JWT
Database	      MongoDB (Mongoose ODM)
AI/Services	      Google Gemini API, ImageKit API

# 📂 System Architecture
The project follows a Monorepo structure with a clear separation of concerns to ensure scalability:

-> /client: A high-performance React frontend utilizing Context API for global state management and Vite for optimized builds.

-> /server: A modular Express backend featuring custom RBAC middleware, controller-driven logic, and secure JWT signing.


# 🔧 Local Setup & Installation
1.Clone the Repository:

    git clone https://github.com/TiwariAdarsh23/OpenVoice-CMS.git

2.Environment Configuration: Create a .env file in the /server directory and add the following keys:

    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secret_key
    GEMINI_API_KEY=your_key
    IMAGEKIT_PUBLIC_KEY=your_key
    IMAGEKIT_PRIVATE_KEY=your_key
    IMAGEKIT_URL_ENDPOINT=your_url

3.Install & Run:

    Bash
    In /server
    npm install && npm run start
    In /client
    npm install && npm run dev





