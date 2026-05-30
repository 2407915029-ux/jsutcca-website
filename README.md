# JLG Meow Team

JLG Meow Team is a non-profit website I built for a student-led campus stray cat rescue group. The project is created for helping stray cats on campus, sharing rescue updates, and making it easier for students to learn about adoption, donation, and volunteer-related information.

The website includes both a public visitor interface and an admin dashboard. Visitors can browse cat profiles and rescue updates, while admins can manage the content from the backend.

## Frontend Overview

The public-facing side is kept simple and focused:

- Home page for introducing the rescue group and recent updates.
- Cat pages for browsing campus cats by status, such as available, adopted, or in memory.
- Cat detail pages for showing each cat's basic information, health status, rescue records, and adoption notes.
- Rescue diary pages for sharing feeding, medical care, neutering, adoption, and daily care updates.
- Donation and merchandise pages for showing non-profit support information.

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


## Highlights

- Designed for a real campus stray cat rescue scenario.
- Includes both public pages and an admin content management dashboard.
- Supports cat profiles, rescue diaries, likes, comments, image uploads, and video display.
- Uses Prisma and PostgreSQL for structured data management.
- Uses JWT and httpOnly Cookie for admin authentication.
- Uses Cloudinary for online image storage.
- Ready to deploy on Vercel.
