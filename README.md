# Bootcamp Frontend - Next.js

This is a simple Next.js frontend application that connects to the NestJS backend API.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ User management UI (Create, Read, Delete)
- ✅ Clean and responsive design
- ✅ Client-side form validation
- ✅ Error handling

## Prerequisites

- Node.js 18+ installed
- Backend API running on http://localhost:3001

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   The default configuration connects to the backend at:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Run the application:**
   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm start
   ```

The app will run on http://localhost:3000

## Features Walkthrough

### User Management Interface
- **Add User**: Fill in name and email, click "Add User"
- **View Users**: All users are displayed in a list with their details
- **Delete User**: Click "Delete" button on any user (with confirmation)

### Error Handling
- Form validation for required fields
- API error messages displayed to user
- Loading states during API calls

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with user management
│   └── globals.css         # Global styles
├── public/                 # Static files
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── package.json
└── tsconfig.json
```

## Customization

### Styling
All styles are in `app/globals.css`. The design uses:
- Clean, modern UI
- Responsive layout
- Form styling with proper spacing
- Button hover effects
- Error and loading states

### API Integration
The API URL is configured via environment variable:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

To change the backend URL, update `.env.local`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Notes

- Uses Next.js App Router (not Pages Router)
- Client components marked with `'use client'`
- TypeScript for type safety
- Fetches data from backend API on component mount
- All API calls include error handling
