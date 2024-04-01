[![codecov](https://codecov.io/gh/0x216/unicorn-homework/graph/badge.svg?token=V7CIVQ0LQH)](https://codecov.io/gh/0x216/unicorn-homework)
[![tests](https://github.com/0x216/unicorn-homework/actions/workflows/tests.yml/badge.svg)](https://github.com/0x216/unicorn-homework/actions/workflows/tests.yml)
[![Build and Push Docker images](https://github.com/0x216/unicorn-homework/actions/workflows/build-and-push.yml/badge.svg)](https://github.com/0x216/unicorn-homework/actions/workflows/build-and-push.yml)
# 🦄 Unicorn University Homework Repository

Welcome to my little adventure into the world of JavaScript development! This repository is a submission for a homework assignment at Unicorn University. 🏫

As I embarked on this journey, transitioning from a Python backend development background into the vibrant world of JavaScript, I decided to apply Pythonic patterns to this project. While some elements like Docker, CI, and tests might appear overkill for its scope, they were included for educational purposes, aiming to delve deeper into the development process.

The application we've crafted is a simple yet powerful web page designed to assist individuals in their journey to quit smoking 🚭. It's inspired by and seeks to mirror the functionality of mobile applications such as "Bad Habit," which I've always admired.

🚀 **About the Project**

The essence of this project lies in its simplicity and the application of advanced development practices on a small scale. It's an exploration of how far one can stretch their wings in a new programming environment, applying familiar patterns from one language to another, and integrating comprehensive development practices.

🛠 **Tech Stack**

The project is built using:
- **Backend:** Node.js with Express, adhering to the assignment's requirements, and Jest for robust testing.
- **ORM:** Sequelize, selected for its Django ORM-like features, paired with PostgreSQL for database management.
- **Frontend:** React.js, bringing a modern web app feel and interactive user interface.
- **Server:** Nginx, configured minimally to serve both the frontend and backend efficiently.

Designed with modularity and ease of development in mind, the codebase is neatly divided into two microservices.

🔧 **Usage and Setup**

To get started, ensure Docker Compose (v2) is installed on your system. A migration guide is available [here](https://docs.docker.com/compose/migrate/).

**Running Tests:**

Execute the following command to run tests across the environment:

```bash
docker compose -f docker-compose.yml -f docker-compose.test.yml up --build --exit-code-from backend
```

**Development Mode:**

For a more hands-on approach, spin up the development environment using:

```bash
docker compose -f docker-compose.yml up
```

**Production Mode:**

To launch the application in a production setting:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

**Environment Setup:**

Make sure your environment is configured according to the `.env_example` found in this repository.

**Exploring the API:**

The API is open for experimentation. Utilize the Postman collection provided in the `postman` folder for an easy import and exploration process.

---

🌐 **Live Demo**

Experience the live version of our application [here](http://5.45.127.115/). Dive into the functionality designed to support your journey towards a smoke-free life.

---

📸 Application Gallery
<details>
  <summary>Login screen</summary>
  
![Home Screen](https://github.com/0x216/unicorn-homework/assets/89255070/407f0c06-ef14-4155-910d-6914a202dbcb)

</details>
<details>
  <summary>Home screen</summary>
  
![image](https://github.com/0x216/unicorn-homework/assets/89255070/7cf2eda3-0c7c-436b-a27c-12bee5a4bfaf)
</details>
<details>
  <summary>Profile screen</summary>
  
![image](https://github.com/0x216/unicorn-homework/assets/89255070/94257cce-66d9-4839-92ce-9ae895352646)
</details>
<details>
  <summary>Start tracking screen</summary>
  
![image](https://github.com/0x216/unicorn-homework/assets/89255070/ea6a8577-6f39-4f5c-b563-11f32426044d)
</details>

---

This transition from Python to JavaScript, embracing new tools and methodologies, marks a challenging yet rewarding phase of my development journey. I look forward to the paths and discoveries that lie ahead. 🌟
