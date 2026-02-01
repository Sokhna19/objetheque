# objetheque
Bibliothèque d'objet pour association

## Description
A web application for managing an association's object library, built with modern technologies.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Authentication**: Auth.js
- **Database**: Prisma, PostgreSQL
- **Deployment**: Docker
- **Authorization**: RBAC (Role-Based Access Control)

## Setup Commands
```bash
rm README.md
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install next-auth @prisma/client prisma @next-auth/prisma-adapter
npx prisma init
npx prisma generate
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## Development

### Prerequisites
- Node.js 24+
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Setup
1. Clone the repository
2. Install dependencies: Run the `install` task in VS Code or `npm install`
3. Set up the database: Run `docker-compose up -d` to start PostgreSQL and Redis
4. Run Prisma migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

### VS Code Tasks
Use the following tasks in VS Code (Ctrl+Shift+P > Tasks: Run Task):
- `install`: Install npm dependencies
- `dev`: Start the development server
- `build`: Build the application
- `lint`: Run ESLint
- `test`: Run tests
- `docker-up`: Start Docker containers

## Future Enhancements
- **Notifications**: Implement user notifications for object availability, due dates, and updates.
- **Admin Features**: Develop a dashboard for administrators to manage users, objects, and generate reports.
- **Monitoring**: Integrate logging and monitoring tools for performance tracking and error handling.

## Development Plan
1. Set up project structure with Next.js and Tailwind CSS.
2. Integrate Auth.js for authentication.
3. Configure Prisma with PostgreSQL.
4. Implement RBAC for authorization.
5. Containerize the application with Docker.
6. Update README.md with current tech choices and future enhancements.
7. Develop core features for object management.
8. Implement future enhancements (notifications, admin features, monitoring).
