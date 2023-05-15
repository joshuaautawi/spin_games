# Your Project Name

Welcome to Your Project Name! This project is an API built with Node.js ,Typescript,mocha,chai, sequelize, and Express.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 7 or higher)
- Database (e.g., PostgreSQL)

### Installation

1. Clone the repository:

```
git clone https://github.com/joshuaautawi/spin_games.git
```

2. Install the dependencies:

```
npm install
```

# Database Configuration

1. Open the `src/config/connection.ts` file.
2. Update the database connection details to match your database configuration:

```typescript
// Replace the placeholders with your database connection details
const connectionConfig = {
  host: "your-hostname",
  database: "your-database-name",
  username: "your-username",
  password: "your-password",
};
```

### Starting API

```
npm run dev
```

### Running Test

```
npm run test
```

### API documentation

https://documenter.getpostman.com/view/17159901/2s93eeRpT8
