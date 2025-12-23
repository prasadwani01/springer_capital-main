Next.js Sales Dashboard

This is a simple dashboard application built with Next.js 15, TypeScript, and Tailwind CSS to visualize mock sales data. It demonstrates how to create a structured, component-based frontend application with interactive features like filtering and dynamic chart types.

Features

Atomic Design Principles: The project is structured with a clear separation of concerns, where the Dashboard page acts as a template/page and SalesChart is a reusable organism.

Interactive Controls:

Select data by year (2022, 2023, 2024).

Filter data with a custom sales threshold input.

Switch between Bar, Line, and Pie chart types.

Responsive Design: The dashboard is designed to be usable on various screen sizes.

Mock Data: Includes pre-defined sales data to simulate a real-world scenario without needing a backend.

Modern Tech Stack: Utilizes the latest features of Next.js 15 (App Router), React 19, and TypeScript.

Tech Stack

Framework: Next.js 15.0.0-rc.0

Language: TypeScript

UI Library: React 19.0.0-rc

Styling: Tailwind CSS

Charting: Recharts

Icons: Lucide React

Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites

You need to have Node.js (version 18.x or later) and npm/yarn/pnpm installed on your machine.

Installation

Clone the repository (or download and extract the provided files into a new project folder):

git clone <your-repo-url>
cd <your-repo-name>


Install dependencies:
Open your terminal in the project root and run:

npm install


or if you use yarn:

yarn install


Running the Development Server

Once the dependencies are installed, you can start the development server:

npm run dev


Open http://localhost:3000/dashboard with your browser to see the result. The application will automatically reload if you change any of the source files.

Project Structure

The project follows the standard Next.js App Router structure.

/
├── app/
│   ├── dashboard/
│   │   └── page.tsx      # The main dashboard page component (template)
│   ├── globals.css     # Global styles and Tailwind directives
│   └── layout.tsx        # The root layout for the application
│
├── components/
│   └── ui/
│       └── SalesChart.tsx # The reusable chart component (organism)
│
├── public/               # Static assets
│
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration


app/dashboard/page.tsx: This is the main entry point for the dashboard. It manages the state for the filters (year, threshold, chart type) and passes the processed data down to the chart component.

components/ui/SalesChart.tsx: This component is responsible for rendering the chart. It's designed to be reusable and stateless, receiving all necessary data and configuration as props. It dynamically renders a bar, line, or pie chart based on the chartType prop.

How to Set Up Your Own GitHub Repository

Go to GitHub and create a new repository.

Initialize a git repository in your local project folder if you haven't already:

git init


Add the files to the repository:

git add .


Commit the files:

git commit -m "Initial commit: Setup Next.js sales dashboard"


Link your local repository to the remote one you created on GitHub:

git remote add origin [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)


Push your code to GitHub:

git push -u origin main


Future Enhancements

API Integration: Replace the mock data with real data fetched from an API using fetch in a server component or a library like SWR/TanStack Query in a client component.

More Chart Options: Add more chart types or allow for more customization of the existing charts.

Authentication: Add user authentication to protect the dashboard.

State Management: For a more complex application, integrate a state management library like Zustand or Redux Toolkit.
