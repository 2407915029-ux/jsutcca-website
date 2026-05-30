# JLG Meow Team

JLG Meow Team is a campus stray cat rescue website with both a public visitor interface and an admin dashboard. The website is used to display campus cat profiles, rescue diaries, donation information, and charity merchandise, while allowing admins to manage the content from the backend.

## Website Overview

The public-facing side includes a homepage, cat list, cat detail pages, rescue diary pages, donation page, and charity merchandise page.

- The homepage introduces the project and displays featured cats for adoption and recent diary posts.
- The cat list supports filtering by status, including available, adopted, and in memory.
- The cat detail page shows basic information, personality, health status, neutering/deworming status, rescue records, medical records, and adoption notes.
- The rescue diary records activities such as neutering, medical care, feeding, offline events, adoption follow-ups, and daily care.
- Diary detail pages support images, videos, likes, and comments.
- The donation page explains how donations are used and provides support methods.
- The merchandise page displays charity products for fundraising.

The admin dashboard supports login, data statistics, cat profile management, diary management, image uploads, and comment management.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Cloudinary
- JWT + httpOnly Cookie
- Zod
- Vercel

## Technical Implementation

The project uses Next.js App Router to build both pages and API routes. The frontend is built with reusable React components, and Tailwind CSS is used for responsive layouts and styling.

For the data layer, Prisma is used with PostgreSQL. The main data models include cat profiles, diary posts, and comments. Cat profiles store information such as name, status, gender, health details, rescue records, and images. Diary posts store title, content, images, video links, likes, and comments. Comments are linked to diary posts through database relations.

Admin authentication is handled through environment-based credentials. After a successful login, the server generates a JWT and stores it in an httpOnly Cookie. Admin pages under `/admin` and backend APIs under `/api/admin/*` are protected.

Image uploads are integrated with Cloudinary. After an admin uploads an image, the system stores only the Cloudinary image URL in the database, which avoids relying on local file storage and makes the project easier to deploy on Vercel.

Diary videos support direct `.mp4` links, Bilibili links, and YouTube links. The project detects the video type and renders it as a player, iframe, or external link.

## Project Structure

```txt
app/
  api/                 API routes
  cats/                Cat list and detail pages
  diary/               Diary list and detail pages
  donate/              Donation page
  shop/                Charity merchandise page
  admin/               Admin dashboard
components/            Shared components, admin forms, upload components
lib/                   Database, auth, validation, video parsing utilities
prisma/                Database schema, migrations, and seed data
public/                Favicon and placeholder images
```

## Local Development

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Local URLs:

```txt
Public site: http://localhost:3000
Admin site:  http://localhost:3000/admin/login
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the following values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"
JWT_SECRET="at-least-32-random-characters"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
```

## Highlights

- Designed for a real campus stray cat rescue scenario.
- Includes both public pages and an admin content management dashboard.
- Supports cat profiles, rescue diaries, likes, comments, image uploads, and video display.
- Uses Prisma and PostgreSQL for structured data management.
- Uses JWT and httpOnly Cookie for admin authentication.
- Uses Cloudinary for online image storage.
- Ready to deploy on Vercel.
