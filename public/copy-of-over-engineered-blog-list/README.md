# Portfolio & Resume Site

A modern, responsive portfolio and resume website built with React, TypeScript, and Vite.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- **TypeScript**: Full type safety for better development experience
- **Fast Performance**: Vite-powered build system for lightning-fast development and builds
- **Blog Section**: Integrated blog to showcase thoughts and projects

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

**Prerequisites:** Node.js 18+ and npm

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── blog-*.tsx      # Blog-related components
│   └── *.tsx           # Feature components
├── core/               # Core utilities and services
├── data.ts             # Static data and content
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Deployment

The site can be deployed to any static hosting service:

1. Build the project:

    ```bash
    npm run build
    ```

2. Deploy the `dist` folder to your preferred hosting provider.

## Customization

- Edit `data.ts` to update portfolio content, projects, and blog posts
- Modify `types.ts` to add new data structures
- Update components in the `components/` directory to change the UI
- Adjust Tailwind configuration in `index.html` for custom styling
