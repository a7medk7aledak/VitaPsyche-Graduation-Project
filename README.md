# Mind Med Project

## Overview

**Mind Med** is a comprehensive mental health platform designed to help users assess and manage their psychological well-being. The platform uses AI and machine learning models to analyze psychological disorders, offers personalized doctor recommendations, and facilitates communication between patients and doctors. It also includes an intelligent chatbot powered by **Rasa Framework**, which provides psychological assessments and general mental health advice. Additionally, the platform enables direct communication between patients and doctors for consultations and continuous support.

## Key Features

- **Psychological Disorder Analysis**: AI models analyze patient data and facial expressions to assess potential psychological disorders.
- **Doctor Recommendations**: Based on the analysis, the platform suggests appropriate doctors for consultations.
- **Patient-Doctor Communication**: Facilitates secure and private communication between patients and doctors for consultations and follow-up sessions.
- **Intelligent Chatbot**: The chatbot, powered by **Rasa Framework**, provides real-time psychological advice and guidance.
- **Articles and Resources**: Offers articles on mental health, well-being tips, and psychological self-help resources.
- **Authentication System**: Users can register, log in, and manage their profiles.

## Technologies Used

- **Next.js**: Front-end framework for building the user interface with server-side rendering and static site generation.
- **Django (or Flask)**: Backend framework handling APIs, user authentication, and data management.
- **Rasa Framework**: Used to power the chatbot for personalized interaction with patients.
- **MongoDB**: NoSQL database used to store user data, session information, and communication history between patients and doctors.
- **Tailwind CSS**: A utility-first CSS framework used to style the platform.
- **Express & Node.js**: API back-end that communicates with the front-end and manages data flows between the client and server.

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v20.15.0 or higher)
- **Python** (v3.12.5 or higher)
- **MongoDB**
- **Django** (or Flask for the backend)
- **Rasa Framework**
- **npm** or **yarn**

### Cloning the Repository

```bash
git clone https://github.com/your-username/mind-med.git
cd mind-med
```
Environment Variables
You need to set environment variables for both the front-end and back-end. Create .env files in the respective directories (client and server).

For Next.js (client):

NEXT_PUBLIC_API_URL=<your_backend_api_url>
NEXT_PUBLIC_RASA_URL=<your_rasa_chatbot_url>
For Django (or Flask) (server):


DATABASE_URL=<your_mongo_db_url>
SECRET_KEY=<your_django_secret_key>
DEBUG=True
Installing Dependencies


For the Next.js front-end:
```bash
cd client
npm install
# or
yarn install
```

For the Django back-end:
```bash
cd server
pip install -r requirements.txt
```


Running the Project
To run the Next.js front-end:
```
cd client
npm run dev
To run the Django back-end:
```

```
cd server
python manage.py runserver
To run the Rasa Chatbot:
```

cd chatbot
```
rasa run
API Testing
Use Postman or Insomnia to test the APIs for the back-end and to ensure the chatbot is responding as expected.
```
Deployment
To deploy the application, you can use the following services:

Vercel for deploying the Next.js front-end:

Ensure environment variables are set in the Vercel dashboard.
Push your changes to GitHub, and Vercel will automatically deploy the site.
Heroku for deploying the Django back-end:

Use the Heroku CLI to deploy.
Set environment variables in Heroku.
Docker for deploying the Rasa Chatbot:

Consider using Docker containers to deploy the chatbot in a cloud environment for scalability.
Communication Features
The Mind Med platform includes secure channels for communication between patients and doctors. Patients can request consultations, and doctors can provide feedback and treatment plans based on the AI analysis of the patient’s psychological state.

The chatbot serves as the initial point of contact for psychological assessments, offering users basic insights and advice before they interact with a doctor for a more detailed consultation.

Contributions
Feel free to fork this repository, submit pull requests, or open issues for feature requests or bug fixes. We welcome community contributions!

