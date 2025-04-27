# Jachacks Agenda and Financial App

This project is a Next.js application built with TypeScript, designed to provide users with an agenda view integrated with Google Calendar and a basic financial overview.

## Features

*   User authentication using NextAuth.js
*   Google Calendar integration to display events
*   Agenda view powered by `react-big-calendar`
*   Basic financial overview and recommendations
*   Responsive design using Tailwind CSS

## Technologies Used

*   Next.js
*   TypeScript
*   React
*   NextAuth.js
*   react-big-calendar
*   Tailwind CSS
*   Moment.js

## Project Structure

*   `src/app/`: Contains the main application pages and API routes.
    *   `page.tsx`: The main landing page handling authentication and rendering core components.
    *   `api/auth/[...nextauth]/route.ts`: NextAuth.js configuration for authentication routes.
*   `src/components/`: Houses reusable React components.
    *   `Agenda.tsx`: Component for displaying the calendar and fetching Google Calendar events.
    *   `FinancialOverview.tsx`: Component for displaying financial information.
    *   `Sidebar.tsx`: Sidebar navigation component.
    *   `ThemeToggle.tsx`: Component for toggling themes.
    *   `ui/`: Contains UI components, likely from a library like Shadcn UI.
*   `src/context/`: Contains React context providers.
    *   `ThemeContext.tsx`: Context for managing the application's theme.
*   `src/lib/`: Utility functions or libraries.
    *   `utils.ts`: General utility functions.
*   `src/utils/`: Helper functions, including AI-related logic.
    *   `aiAssistant.ts`: Contains basic financial analysis and recommendation logic.
*   `public/`: Static assets.
*   `package.json`: Project dependencies and scripts.
*   `tsconfig.json`: TypeScript configuration.
*   `next.config.ts`: Next.js configuration.
*   `postcss.config.mjs`: PostCSS configuration (for Tailwind CSS).
*   `eslint.config.mjs`: ESLint configuration.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd jachacks
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    (or `npm install` or `yarn install` if you are not using pnpm)
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the necessary environment variables for NextAuth.js and Google Calendar API. You will need to set up a Google Cloud project and enable the Calendar API to get the required credentials.

    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
    ```
    Replace the placeholder values with your actual credentials.

## Running the Project

To run the project in development mode:

```bash
pnpm run dev
```
(or `npm run dev` or `yarn dev`)

The application will be available at `http://localhost:3000`.

To build the project for production:

```bash
pnpm run build
```
(or `npm run build` or `yarn build`)

To start the production server:

```bash
pnpm run start
```
(or `npm run start` or `yarn start`)
