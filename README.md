[![codecov](https://codecov.io/gh/0x216/unicorn-homework/graph/badge.svg?token=V7CIVQ0LQH)](https://codecov.io/gh/0x216/unicorn-homework)[![tests](https://github.com/0x216/unicorn-homework/actions/workflows/workflow.yml/badge.svg)](https://github.com/0x216/unicorn-homework/actions/workflows/workflow.yml)

# 🦄 Unicorn University Homework Repository

Welcome to my little adventure into the world of JavaScript development! This repository is a submission for a homework assignment at Unicorn University. 🏫

🚀 **About the Project**

As someone who has never ventured beyond the simplicity of "Hello World" in JavaScript, but comes from a background in Python backend development, I've decided to stretch my wings and apply Pythonic patterns to this small project. This project might contain elements like Docker, CI, and tests that might seem overkill for its scope and were included purely for educational purposes. However, I hope someone finds them useful, or at least interesting!

The application is a simple web page designed to help you quit smoking 🚭, mirroring the functionality of mobile applications such as Bad Habit, which I've admired in the past.

🛠 **Tech Stack**

- **Backend:** Node.js + Express (as per the assignment's requirements), with Jest for testing.
- **ORM:** Sequelize, chosen for its resemblance to Django ORM, along with PostgreSQL.
- **Frontend:** React.js for that modern web app feel.
- **Server:** Nginx, used with minimal configuration for both services.

The codebase is split into two microservices for modularity and ease of development.

🔧 **Usage and Setup**

Before you dive in, make sure you have Docker Compose (v2) installed. You can find the migration guide [here](https://docs.docker.com/compose/migrate/).

**Running Tests:**

```bash
docker compose -f docker-compose.yml -f docker-compose.test.yml up --build --exit-code-from backend
```

**Development Mode:**

```bash
docker compose -f docker-compose.yml up
```

**Production Mode:**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

**Environment Setup:**

Ensure you have a `.env` file set up according to the `.env_example` provided in this repository.

**Exploring the API:**

Feel free to experiment with the API using Postman. You can find the collection in the `postman` folder for easy import (Postman -> Import Collection).

---

This journey from Python to JavaScript, exploring new tools and technologies along the way, has been a challenging yet enriching experience. I'm eager to see where this path will take me next. 🌟
