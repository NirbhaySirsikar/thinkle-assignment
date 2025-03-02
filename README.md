# Thinkle Assignment

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Code Structure](#code-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Project Structure

```
thinkle-creator-dashboard/
├── public/              # Static assets and HTML entry point
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # Page components used by routing
│   ├── styles/          # CSS stylesheets
│   └── App.jsx          # Main application component
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- npm (v7.0.0 or later)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/NirbhaySirsikar/thinkle-assignment.git
cd thinkle-assignment
```

2. Install dependencies:

```sh
npm install
```

### Running the Application

To start the development server:

```sh
npm run dev
```

The application will be available at http://localhost:8080.

## Deployment

### Building for Production

To create a production build:

```sh
npm run build
```

This will generate optimized files in the `dist` directory.

### Deployment Options

- **Netlify/Vercel**: Connect your GitHub repository to these platforms for automated deployment.
- **Manual Deployment**: Upload the contents of the `dist` directory to any static file hosting service.

## Code Structure

### Components

The application is structured using reusable React components:

- **Sidebar.jsx**: Navigation sidebar with collapsible functionality
- **EarningsCard.jsx**: Display cards for earnings metrics
- **EarningsTable.jsx**: Interactive table for monthly earnings data
- **Modal.jsx**: Reusable modal component for displaying forms and information
- **BankDetailsForm.jsx**: Form for adding/updating banking information
- **Button.jsx**: Reusable button component with different styles

### Styles

CSS files are organized alongside their corresponding components:

- **global.css**: Base styles and global CSS variables
- **Sidebar.css**: Styles for the sidebar
- **Dashboard.css**: Styles for the dashboard
- **BankDetailsForm.css**: Styles for the bank detail form modal
- **EarningsCard.css**: Styles for the Earnings Cards on the dashboard
- **EarningsTable.css**: Styles for the Earnings Table on the dashboard
- **Button.css**: Styles for the button

### Responsive Design

The application is fully responsive with specific adaptations for mobile devices:
- Uses media queries to adjust layouts for different screen sizes
- Implements a mobile menu for navigation on smaller screens
- Redesigns tables as cards for better mobile viewing experience

## Technologies Used

- **React**: Frontend library for building the user interface
- **Vite**: Fast build tool and development server
- **React Router**: For navigation and routing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
