# VitaPsyche Grauation

## Overview

**VitaPsyche** is a comprehensive mental health platform designed to help users assess and manage their psychological well-being. The platform uses AI and machine learning models to analyze psychological disorders, offers personalized doctor recommendations, and facilitates communication between patients and doctors. It also includes an intelligent chatbot powered by **Rasa Framework**, which provides psychological assessments and general mental health advice. Additionally, the platform enables direct communication between patients and doctors for consultations and continuous support.

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
## What we use (tools and technics) in the project 
- **[c4 model](https://lucid.app/lucidchart/d27bb7b0-a6a4-4dc4-b331-cb1cb5a0fe75/edit?viewport_loc=-3309%2C-2888%2C14183%2C6936%2CuP1BopAARZY8&invitationId=inv_62660a21-c50a-42fa-bc2f-c8654397950b)**
- **[Graduation project document (have all details like requirements, sprints, scopes)]**
- **[=>Arabic](https://docs.google.com/document/d/1X66JluUduaJcJb6x4oN44hjG9j4wGpks/edit?usp=sharing&ouid=106983660667056562566&rtpof=true&sd=true)**
- **[=>English](https://docs.google.com/document/d/1R4gVHviel13bhA-YSg4s5ha7TkhZY2zE/edit?usp=sharing&ouid=106983660667056562566&rtpof=true&sd=true)**
- **[Chatbot architecture ](https://lucid.app/lucidchart/0871c322-b0d0-439d-bfc4-b12ea432d21a/edit?viewport_loc=-1229%2C-57%2C2129%2C1041%2C0_0&invitationId=inv_d8c182c1-062d-4ef7-9f43-e9f8667c823c)**
- **[structure of files](https://app.eraser.io/workspace/T243vGvCy29e7hE33kBA)**
- **[Methodology SDLC =>Agile software Methodology](https://lucid.app/lucidspark/3b379e59-68f0-4db8-b93b-860cb50fa00a/edit?viewport_loc=-2422%2C-111%2C8894%2C4257%2C0_0&invitationId=inv_359fa0d4-c954-40f2-ae18-a486852a7bbf)**
- **[hierarchy of the team](https://lucid.app/lucidchart/e68155fa-4cd0-45bc-98c4-c37fab8f13a0/edit?invitationId=inv_4fe57076-e824-4d25-ac5d-38e442c1d9dd&page=0_0)**
- **[ALM (Application Lifecycle Management) (jira)](https://aiet-team.atlassian.net/jira/software/projects/DP/boards/1/backlog?epics=visible)**
### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v20.15.0 or higher)
- **Python** (v3.8 to v3.10)
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
```
NEXT_PUBLIC_API_URL=<your_backend_api_url>
NEXT_PUBLIC_RASA_URL=<your_rasa_chatbot_url>
```
For Django (or Flask) (server):
```
DATABASE_URL=<your_mongo_db_url>
SECRET_KEY=<your_django_secret_key>
DEBUG=True
```

Installing Dependencies and run
To run all project in your device follow that steps: 
1-Next.js front-end:
```bash
cd client
#install node_modules
npm install
npm run dev
```
2-Flutter mobile app:
```
cd mobile
flutter pub get
```
3.5-Django back-end all project:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process\
py -3.9 -m venv .venv
.\.venv\Scripts\activate
cd Back-End
cd Project
pip install django
py -m pip install --upgrade pip
pip install requests
pip install djangorestframework
pip install django-cors-headers
pip install drf-yasg
pip install djangorestframework-simplejwt
pip install coverage

or 
pip install -r requirements.txt
#to run the server
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

python manage.py runserver 5000
```
3-Django back-end for chatbot:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process\
py -3.9 -m venv .venv
.\.venv\Scripts\activate
cd server
pip install django
py -m pip install --upgrade pip
pip install requests
pip install django-cors-headers
pip install drf-yasg
pip install djangorestframework-simplejwt
pip install -r requirements.txt
#to run the server
python manage.py runserver
```
to make backend tastes:
```bash
cd Back-End/Project
python manage.py test
coverage run --source='.' manage.py test
coverage report -m
```

4-rasa chatbot:
```bash
#note Python versions: 3.7, 3.8, 3.9, and 3.10. Note that Python 3.10 is only supported for versions 3.4.x and upwards
#to make a new Environment =>  that step make it once
cd chatbot
pip install rasa
pip install --upgrade cryptography
or
pip install cryptography==3.4.8
rasa train
rasa run -m models --enable-api --cors "*"
```
5-rasa lina:
```bash
cd lina model
pip install rasa
pip install cryptography==38.0.4
rasa train
rasa run --port 5006
```



note:
To test the Rasa Chatbot and Lina by terminal:
```bash
rasa train
rasa shell
```
API Testing
Use Postman or Insomnia to test the APIs for the back-end and to ensure the chatbot is responding as expected.

# Project Design Links figam

### Mobile Design figma
[moblie](https://www.figma.com/design/QZWLyKjYRs6WmyCyAiuZII/Untitled?node-id=0-1&t=G417WzsZIOwOOTCJ-1)

### Web Design figma
[web](https://www.figma.com/design/o7kyURJwQIFXXfRQnH2K7D/mindMED?node-id=0-1&t=MTEzKBMnCCIYmVUO-1)


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

