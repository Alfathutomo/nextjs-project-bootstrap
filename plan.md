# Detailed Plan for Data Aptika Jeneponto Management Website

## Information Gathered
- The website is for managing Data Aptika Jeneponto.
- Menus required: Data Aplikasi Website, Data JCC, Data Tower, Data SPBE, Data Pengguna (for website access).
- CRUD operations needed for all data categories.
- Access flow: only through login; no public pages.
- After successful login, admin management page opens.
- Data must be linked to a database.
- Use Tailwind CSS and shadcn UI components.
- Modern black and white theme.
- Responsive design.
- Use Google Fonts for typography.

## Plan

### Authentication
- Create a login page as the only public page.
- Implement authentication with session management.
- Protect all admin routes; redirect unauthenticated users to login.

### Admin Dashboard
- Create an admin dashboard page with navigation menu for the data categories.
- Use shadcn UI components for menus and layout.
- Black and white modern styling with Tailwind CSS.

### CRUD Pages
- Create separate pages/components for each data category:
  - Data Aplikasi Website
  - Data JCC
  - Data Tower
  - Data SPBE
  - Data Pengguna
- Each page will have CRUD functionality (Create, Read, Update, Delete).
- Use forms and tables from shadcn UI components.
- Connect CRUD operations to backend API routes.

### Database Integration
- Use Prisma ORM for database access.
- Use SQLite or PostgreSQL as the database.
- Define Prisma schema for all data categories.
- Implement API routes for CRUD operations.

### Routing and Access Control
- Use Next.js middleware or server-side checks to protect admin routes.
- Redirect unauthenticated users to login page.

### Styling and Fonts
- Use Tailwind CSS for styling.
- Use Google Fonts for typography.
- Black and white color scheme.
- Responsive design for all pages.

## Dependent Files to be Created/Edited
- src/app/page.tsx (login page)
- src/app/admin/layout.tsx (admin layout with navigation)
- src/app/admin/page.tsx (dashboard home)
- src/app/admin/[category]/page.tsx (CRUD pages for each category)
- src/lib/prisma.ts (Prisma client)
- prisma/schema.prisma (Prisma schema)
- src/app/api/[category]/route.ts (API routes for CRUD)
- Middleware or auth utilities for session management

## Follow-up Steps
- Implement the above components and pages.
- Test login flow and access control.
- Test CRUD operations and database integration.
- Style and polish UI for modern look.

Please confirm if I can proceed with this detailed plan.
