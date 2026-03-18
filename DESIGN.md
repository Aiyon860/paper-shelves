A comprehensive UI/UX Design System specification sheet for a modern digital library application, constructed with Next.js App Router, Tailwind CSS, and shadcn/ui, presented in a clean, professional grid layout on a single canvas. The design bridges 'Modern Minimalist Paper' aesthetic with granular frontend technical details. The canvas is organized as a professional design document with clear labels and sections, split vertically to show two distinct states: [State A: Light Mode] against a slate-50 base, and [State B: Dark Mode] against a slate-950 base, illustrating seamless theme switching.

Core Visual Elements to Include:

1. GLOBAL FOUNDATIONS & SEMANTIC TOKENS:

Color Palette (Tailwind Semantic Names): Swatches showing Hex codes and semantic classes (e.g., bg-background, text-foreground, border-border, bg-card). List Accents (Indigo), Success (Green), and Error (Red).

Typography System (Next/Font optimized): Hierarchy displaying fonts.

Serif (for Titles): Playfair Display style showing h1, h2 sizes with font-semibold.

Sans-serif (for UI/Body): Inter style showing base, sm, xs sizes.

Iconography (Lucide React style): A curated outlined icon set (stroke-1.5). Examples: Search, Heart (empty), Heart (filled-red), PlusCircle, Moon, Sun.

2. INTERACTIVE LEAF COMPONENTS (CLIENT-SIDE EMPHASIS):

Buttons (shadcn/ui style): Show Default (Filled Primary Indigo), Outline, and Ghost. Show Default, Hover, Focus (with ring), and Loading state with a spinner.

Form Inputs (Zod Validation states): Text inputs showing Default, Focus (Indigo ring), and Error state (Red border + helper text below it).

Favorite Toggle (Heart Component): Showing the direct transformation from an outlined heart (🤍) to a filled-red heart (❤️) with subtle animation hints.

3. COMPOUND STRUCTURAL COMPONENTS (SERVER-SIDE EMPHASIS):

Dynamic Book Card (<Card> component): Vibrant book cover, Serif title, Sans-serif author (text-muted-foreground), reading progress bar, Favorite Button placed at the bottom right. Show grid layout.

Navbar/Header: Top navigation showing routing links, a Search bar, and a Theme Toggle button (Sun/Moon icon).

4. APPLICATION STATES & USER FEEDBACK:

Skeleton Loader (loading.tsx): An animated gray block placeholder grid mimicking the Book Card layout structure.

Feedback Toasts (Sonner style): Minimalist pop-up notifications at the bottom right. Show a Success Toast ('Book added successfully!') and an Error Toast with corresponding icons.

Overall Style: Hyper-realistic interface render, flat UI design style, studio lighting, extremely organized, high fidelity, 8k resolution, graphic design layout.
