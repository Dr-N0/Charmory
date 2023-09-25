# Charmory
A Dungeons and Dragons Character Creator

Welcome to the Dungeons and Dragons Character Creator, a powerful and flexible web application built with Next.js 13, React.js, NextAuth, Prisma, and PostgreSQL. Whether you're a seasoned Dungeon Master (DM) or a beginner adventurer, this application is designed to enhance your D&D experience by providing you with a robust toolset for creating and customizing your characters with ease.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### 1. Quick Character Builds
The D&D Character Creator offers a streamlined process for creating characters. You can quickly generate a basic character with the click of a button, allowing you to dive into the action without spending hours on character creation.

### 2. Scalable Customization
Whether you're a meticulous role-player who enjoys crafting intricate backstories and character traits or a casual player looking for a simplified experience, our application has you covered. You can choose the level of detail for your character, from basic attributes to in-depth background stories, all within the same intuitive interface.

### 3. Responsive Design
Our application is built with responsive design principles, ensuring that you can access and use it seamlessly on various devices, from desktop computers to tablets and smartphones. The user interface adapts to different screen sizes and orientations, providing an excellent user experience no matter where you are.

### 4. Dynamic Programming
The D&D Character Creator leverages dynamic programming to optimize character generation and customization. This means that the application efficiently calculates and updates character statistics and traits, ensuring that your character remains balanced and compliant with D&D rules.

### 5. User Authentication with NextAuth
Secure your character sheets and data with user authentication powered by NextAuth. Create an account, log in, and access your characters from anywhere, knowing that your creations are safe and accessible only to you.

### 6. Database Storage with Prisma and PostgreSQL
We use Prisma as our database ORM (Object-Relational Mapping) and PostgreSQL as the database backend. This combination provides a robust and efficient way to store and retrieve character data, ensuring data integrity and reliability.

## Getting Started

Before you dive into character creation, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Git](https://git-scm.com/)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Dr-N0/Charmory
   ```

2. Navigate to the project directory:

   ```bash
   cd Charmory
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Set up your PostgreSQL database and configure the database connection in the `.env.local` file:

   ```
   DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database-name
   ```

5. Run database migrations:

   ```bash
   npx prisma db push
   ```

6. Start the application:

   ```bash
   npm run dev
   ```

7. Open your web browser and navigate to `http://localhost:3000` to access the Dungeons and Dragons Character Creator.

## Usage

1. **Create an Account**: If you haven't already, create a user account using NextAuth authentication.

2. **Log In**: Log in to your account to access your saved characters and to enable character creation.

3. **Character Creation**: Click "Get Going" then the "Create" button to begin character creation. Follow the step-by-step process to define your character's attributes, abilities, and backstory.

4. **Customization**: Tailor your character to your liking by choosing the level of detail you want to provide. You can go as simple or as intricate as you desire.

5. **Save and Access Characters**: Save your created characters to your account for easy access and editing. You can have multiple characters stored and ready for your next D&D adventure.

6. **Interactive Character Sheet**: Use your character sheets right on the app to have a physical copy during your D&D sessions!

## Contributing

We welcome contributions from the D&D community! Whether it's fixing a bug, adding a new feature, or improving documentation, your help is valuable. Please read our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy your journey into the world of Dungeons and Dragons with Charmory. May your characters be heroic and your adventures legendary! If you have any questions or encounter any issues, feel free to reach out to our community or open an issue on our GitHub repository. Happy gaming!
