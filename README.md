# Heatmap Project

## Overview

The Heatmap Project is a web application designed to visualize user interactions on a webpage using heatmaps. It leverages Next.js for server-side rendering, MongoDB for data storage, and various other libraries for enhanced functionality.

## Features

- **User Authentication**: Secure user authentication using `next-auth`.
- **Heatmap Visualization**: Display user interaction data using `heatmap.js`.
- **Role-Based Access**: Different functionalities for users based on their roles (e.g., owner, admin).
- **Responsive Design**: Mobile-friendly and responsive UI using Tailwind CSS.
- **Data Management**: Efficient data handling with MongoDB and Mongoose.

## Project Structure

- **`/components`**: Reusable components for the application.
- **`/lib`**: Utility functions and constants.
- **`/pages`**: Next.js pages for the application.
- **`/public`**: Static assets for the application.
- **`/styles`**: Global styles and Tailwind CSS configuration.
- **`/utils`**: Helper functions for the application.

## Getting Started

1. Clone the repository:

```bash
git clone 
```

2. Install the dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
mongoURI="url"

```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage 

1. Sign up for a new account and wait till the admin Gives you access or log in with an existing one.
2. View the heatmap data on the dashboard.