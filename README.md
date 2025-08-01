# VectraSystems

VectraSystems is a platform designed to help users discover, create, and follow expert-curated roadmaps for learning new skills, particularly in the field of Machine Learning.

This project is a [Next.js](https://nextjs.org) application bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technologies Used

*   **Next.js 15.x**: React framework for production.
*   **React 19.x**: JavaScript library for building user interfaces.
*   **Tailwind CSS 3.x**: A utility-first CSS framework for rapid UI development.
*   **Supabase**: Open-source Firebase alternative for database and authentication.
*   **Framer Motion**: A production-ready motion library for React.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
*   Node.js (v18 or higher recommended)
*   npm (Node Package Manager)

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables, replacing the placeholder values with your actual Supabase project details:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Installation

First, install the project dependencies:

```bash
npm install
```

### Running the Development Server

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

### Building for Production

To build the application for production:

```bash
npm run build
```

### Linting

To run the linter:

```bash
npm run lint
```

## Project Structure Highlights

*   `src/app/`: Contains the main application pages and layout.
*   `src/components/`: Reusable React components.
*   `src/lib/`: Utility functions and Supabase client initialization.
*   `src/styles/globals.css`: Global Tailwind CSS styles.

## Known Issues and Limitations

*   **Drag-and-Drop Functionality:** The `react-beautiful-dnd` library was removed due to incompatibility with React 19. The "Create Roadmap" page currently uses a basic list for topics without drag-and-drop reordering.
*   **Flowbite-React Components:** `flowbite-react` was removed due to build issues. Components previously using it (e.g., Dropdown in Marketplace) have been replaced with basic HTML elements.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.