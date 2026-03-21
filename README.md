# Paper Shelves

A sophisticated, full-stack web application designed for cataloging and managing a digital book collection. Built with **Next.js (App Router)** and **Supabase**, this project demonstrates modern React patterns, server-side data fetching, atomic database transactions, and a strong focus on User Experience (UX) and clean architecture.

## Key Features

- **Full CRUD Operations**: Effortlessly add, edit, view, and delete book manuscripts.
- **Advanced Search & Filtering**: Server-side search integrated directly into the URL parameters. Includes input debouncing and auto-refocusing for a seamless user experience.
- **Dynamic Categorization**: Support for Many-to-Many relationships. Books can be assigned to multiple categories, handled safely via backend stored procedures.
- **Optimistic UI Updates**: "Favorite" toggling uses React's `useOptimistic` for instantaneous feedback before the server confirms the mutation.
- **Robust Error Handling & Validation**: Type-safe form validation using Zod, integrated seamlessly with Next.js Server Actions.
- **Polished UX**: Beautifully crafted UI using Tailwind CSS and Shadcn UI. Includes loading skeletons, smooth transition states, network status indicators, and toast notifications.
- **Fully Tested**: Comprehensive unit and component test suites built with **Vitest** and React Testing Library.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database & Backend**: Supabase (PostgreSQL, RPC / Stored Procedures)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Lucide Icons
- **State Management**: React Hooks (`useActionState`, `useTransition`, `useOptimistic`, `useSyncExternalStore`)
- **Testing**: Vitest, React Testing Library
- **Validation**: Zod

## Architecture & Design Decisions

This project is built to reflect enterprise-level standards and best practices:

1. **Server vs. Client Components**: Strict separation of concerns. Data fetching and pagination occur on the Server Components to minimize JavaScript bundles, while interactivity (search inputs, forms) is isolated in Client Components.
2. **Atomic Database Transactions**: To handle the Many-to-Many relationship between `books` and `categories`, the application utilizes **Supabase RPC (Remote Procedure Calls)**. Operations like adding, updating, or deleting books execute within atomic PostgreSQL functions (`add_book_with_categories`, `delete_book_with_categories`), ensuring data integrity without multiple frontend-to-backend roundtrips.
3. **URL-Driven State**: Search queries and pagination parameters are stored in the URL. This enables deep-linking, better SEO, and allows the Next.js server to handle filtering before rendering the page.


## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Supabase account and project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/paper-shelves.git
   cd paper-shelves
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project uses Vitest for blazing-fast unit and component testing. The test suite covers utility functions, complex component states (like modals and toasts), and user interactions.

To run the test suite:
```bash
npm run test
```

## Future Roadmap

- Implementation of user authentication and personalized libraries.
- Rich text editor for manuscript synopsis.
- E-book reader integration for viewing actual manuscript contents.
- CI/CD pipeline integration via GitHub Actions.

---

*This project was developed to showcase expertise in modern React ecosystems, backend-as-a-service integration, and detail-oriented frontend development.*