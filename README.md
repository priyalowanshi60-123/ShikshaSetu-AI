# ShikshaSetu-AI

An AI-powered student learning platform designed to provide courses, lessons, progress tracking, quizzes, career guidance, scholarships information, and an AI learning assistant.

## Features

* User registration and login
* Student dashboard
* Course and lesson management
* 25 structured learning lessons
* Lesson completion tracking
* Automatic learning progress calculation
* English and Hindi language support
* Bilingual course and lesson content
* AI learning assistant
* Voice input for AI questions
* Text-to-speech for AI answers
* Quiz module
* Career guidance section
* Scholarship information section
* MongoDB database integration
* Local AI using Ollama and Llama 3.2

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI

* Ollama
* Llama 3.2

### Authentication

* JWT-based authentication

## Project Structure

```text
ShikshaSetu-AI/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── lessonController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── course.js
│   │   ├── lesson.js
│   │   ├── progress.js
│   │   ├── quiz.js
│   │   ├── subject.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── progressRoutes.js
│   │   └── subjectRoutes.js
│   │
│   ├── server.js
│   └── translateData.js
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── courses.html
│   ├── ai-assistant.html
│   ├── quiz.html
│   ├── career.html
│   ├── scholarships.html
│   │
│   ├── js/
│   │   └── language.js
│   │
│   └── css/
│
├── backup/
│   └── before-translation/
│
├── .env
├── package.json
└── README.md
```

## How the System Works

The application follows this general flow:

```text
Student
   ↓
Frontend
   ↓
Express.js Backend
   ↓
MongoDB
```

For AI features:

```text
Student Question
      ↓
AI Assistant Page
      ↓
Express.js /api/ai/ask
      ↓
Ollama
      ↓
Llama 3.2
      ↓
AI Response
      ↓
Frontend
```

## Database

The project uses MongoDB database:

```text
shikshaSetu
```

The database contains collections for:

* Users
* Courses
* Subjects
* Lessons
* Progress
* Quizzes

The current learning content contains one main course with 25 lessons.

## Language Support

The application supports two languages:

* English
* हिंदी

Course titles, descriptions, lesson titles, and lesson content are stored in both languages.

The selected language is controlled through the frontend language system.

## AI Assistant

The AI assistant runs locally using Ollama.

Required model:

```text
llama3.2
```

Ollama runs locally on the student's computer, so the project does not depend on a paid cloud AI API for the current local setup.

## Voice Features

The AI assistant supports:

```text
Voice Input
    ↓
Speech Recognition
    ↓
Question Text
    ↓
Local Llama 3.2
    ↓
AI Answer
    ↓
Text-to-Speech
```

## Installation

### 1. Install Node.js

Verify:

```powershell
node --version
```

### 2. Install project dependencies

From the project root:

```powershell
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload `.env` to GitHub.

### 4. Install Ollama

Install Ollama and make sure the Llama 3.2 model is available:

```powershell
ollama list
```

The required model is:

```text
llama3.2
```

### 5. Start the backend

```powershell
node ".\backend\server.js"
```

The application runs at:

```text
http://localhost:5000
```

## Main Pages

| Page                | Purpose                 |
| ------------------- | ----------------------- |
| `index.html`        | Home page               |
| `login.html`        | Login and registration  |
| `dashboard.html`    | Student dashboard       |
| `courses.html`      | Courses and lessons     |
| `ai-assistant.html` | AI learning assistant   |
| `quiz.html`         | Quiz                    |
| `career.html`       | Career guidance         |
| `scholarships.html` | Scholarship information |

## Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Courses

```text
GET  /api/courses
POST /api/courses
GET  /api/courses/:id
```

### Lessons

```text
GET  /api/lessons/course/:courseId
GET  /api/lessons/:id
POST /api/lessons
```

### Progress

```text
GET /api/progress/dashboard
GET /api/progress
```

### AI

```text
GET  /api/ai/test
POST /api/ai/ask
```

## Progress Tracking

The application calculates learning progress from completed lessons.

For example:

```text
1 completed lesson / 25 total lessons
= 4% progress
```

Progress is stored in MongoDB and is connected to the student's account.

## Data Safety

A MongoDB backup was created before the bilingual translation update.

Backup location:

```text
backup/before-translation
```

The backup contains the existing project database data, including courses, lessons, users, progress, subjects, and quizzes.

## Future Improvements

Possible future improvements include:

* More courses and subjects
* More quizzes
* Personalized learning recommendations
* Advanced student analytics
* Admin dashboard
* Cloud deployment
* Hosted AI service for production deployment
* Certificate generation
* Better recommendation system

## Project Goal

ShikshaSetu-AI aims to create an accessible digital learning platform where students can:

```text
Learn
  ↓
Practice
  ↓
Track Progress
  ↓
Ask AI
  ↓
Explore Careers
  ↓
Find Scholarships
```

## Status

Core project functionality has been tested successfully, including:

* Authentication
* Dashboard
* Course loading
* 25 lessons
* Lesson completion
* Progress tracking
* English/Hindi content
* Local AI assistant
* Voice interaction
* Quiz
* Career section
* Scholarship section
* Backend APIs
* MongoDB integration
